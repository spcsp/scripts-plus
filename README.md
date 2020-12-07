## ScriptyStrokes, a StrokesPlus.net Scripting Framework

### This was made this for fun because I love StrokesPlus.net and I also love Javascript.

Initially I tried to use the load external script feature but when I moved the file on accident, it caused a crash loop where I couldn't even start the program anymore. I put the old file back and started thinking how to over come this, something more dynamic.

I like the `require()` function used in CommonJs to load other modules, so I put to work to try and make an implementation of this functionality for myself. I started with a little bootstrapper that sets up `__dirname` to reference the framework files, then a simple version of the code for the loader.

# Adding The ScriptyStrokes Bootstrapper
Under `Global Action`, pick the `Load/Unload` tab, and check the box to enable the load script.
Replace the path with the absolute path to the cloned repository.
```
sp.StoreString("SCRIPTY_ROOT", String.raw`C:\Users\Me\Downloads\scripty-strokes`);
const $ = eval("("+File.ReadAllText(`${sp.GetStoredString("SCRIPTY_ROOT")}/bootstrap.js`)+")");
```

The bootstrapper takes care of providing a rich standard library that wraps many common `sp.xxxx` methods with simple APIs.

## Examples
```javascript
$.alert("Hello World");
```

```javascript
$.toast("Hello World");
```

```javascript
var toaster = $.toast.factory("My Toaster is Fancy");

toaster("I MAKE TOAST!");
```

```javascript
$.balloon("Hello World!", { title: "Custom Title" });
```

These are just a few of the many modules that come included. Check out the [stdlib](https://github.com/kevinkhill/scripty-strokes/tree/main/scripty_modules/lib) modules as well as [application specific modules](https://github.com/kevinkhill/scripty-strokes/tree/main/scripty_modules/apps) too.


# Writing Modules
Scripty Modules look just like CJS modules, with a defined `module.exports` containing what you want to export from the module.

### Classes
```javascript
class Environment {
  expand(name) {
    return clr.System.Environment.GetEnvironmentVariable(name);
  }
}

module.exports = new Environment();
```
[source of the env module](https://github.com/kevinkhill/scripty-strokes/blob/main/scripty_modules/lib/env.js)


### Functions
```javascript
/**
 * Create a modal dialog box notification.
 *
 * @param message string
 * @param title   string
 */
function alert(message, title = "ScriptyStrokes") {
  sp.MessageBox(message, title);
}

module.exports = alert;
```

### Complex Functionality & Multiple Exports
```javascript
function queryString(obj) {
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}

function request({ baseUrl }) {
  var httpHandler = new HttpClientHandler();
  httpHandler.AutomaticDecompression = host.flags(
    DecompressionMethods.GZip,
    DecompressionMethods.Deflate
  );

  var client = new HttpClient(httpHandler);
  client.BaseAddress = new Uri(baseUrl);

  return (url, params) => {
    var endpoint = params ? `${url}?${queryString(params)}` : url;
    var response = client.GetAsync(endpoint).Result;
    var result = response.Content.ReadAsStringAsync().Result;

    httpHandler.Dispose();
    client.Dispose();

    return result;
  };
}

module.exports = { queryString, request };
```

With the simple StrokesPlus.net actions usage:
```javascript
var stackExchange = $.request({ baseUrl: "https://api.stackexchange.com/2.2/" });

var res = stackExchange("answers", {
  order: "desc",
  sort: "activity",
  site: "stackoverflow"
});

clip.SetText(res);
```