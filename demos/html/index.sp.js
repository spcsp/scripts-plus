function processMessage(val) {
  // https://github.com/gvergnaud/ts-pattern
  // Webpack-ed for use here in V8!
  // eslint-disable-next-line prettier/prettier
  let tsPattern;(()=>{var t={511:(t,n)=>{"use strict";var e;n.__esModule=!0,n.__=n.PatternType=void 0,function(t){t.String="@ts-pattern/string",t.Number="@ts-pattern/number",t.Boolean="@ts-pattern/boolean",t.Guard="@ts-pattern/guard",t.Not="@ts-pattern/not",t.Select="@ts-pattern/select"}(e=n.PatternType||(n.PatternType={})),n.__={string:e.String,number:e.Number,boolean:e.Boolean}},176:function(t,n,e){"use strict";var r=this&&this.__read||function(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,u,a=e.call(t),o=[];try{for(;(void 0===n||n-- >0)&&!(r=a.next()).done;)o.push(r.value)}catch(t){u={error:t}}finally{try{r&&!r.done&&(e=a.return)&&e.call(a)}finally{if(u)throw u.error}}return o},u=this&&this.__spread||function(){for(var t=[],n=0;n<arguments.length;n++)t=t.concat(r(arguments[n]));return t};n.__esModule=!0,n.match=n.__=n.select=n.not=n.when=void 0;var a=e(511);n.__=a.__,n.when=function(t){return{"@ts-pattern/__patternKind":a.PatternType.Guard,"@ts-pattern/__when":t}},n.not=function(t){return{"@ts-pattern/__patternKind":a.PatternType.Not,"@ts-pattern/__pattern":t}},n.select=function(t){return{"@ts-pattern/__patternKind":a.PatternType.Select,"@ts-pattern/__key":t}},n.match=function(t){return o(t,[])};var o=function(t,n){return{with:function(e){for(var r=[],a=1;a<arguments.length;a++)r[a-1]=arguments[a];var i=r[r.length-1],c=r.slice(0,-1),s=function(t){return Boolean(p(e)(t)&&c.every((function(n){return n(t)})))};return o(t,u(n,[{test:s,handler:i,select:_(e)}]))},when:function(e,r){return o(t,u(n,[{test:e,handler:r,select:function(){return{}}}]))},otherwise:function(e){return o(t,u(n,[{test:p(a.__),handler:e,select:function(){return{}}}])).run()},run:function(){var e=n.find((function(n){return(0,n.test)(t)}));if(!e){var r=void 0;try{r=JSON.stringify(t)}catch(n){r=t}throw new Error("Pattern matching error: no pattern matches value "+r)}return e.handler(t,e.select(t))},exhaustive:function(){return o(t,n)}}},i=function(t){return Boolean(t&&"object"==typeof t)},c=function(t){return Array.isArray(t)},s=function(t){return t&&t["@ts-pattern/__patternKind"]===a.PatternType.Select},f=function(t){return Array.isArray(t)&&1===t.length},p=function(t){return function(n){if(t===a.__||s(t))return!0;if(t===a.__.string)return"string"==typeof n;if(t===a.__.boolean)return"boolean"==typeof n;if(t===a.__.number)return"number"==typeof n&&!Number.isNaN(n);if(function(t){var n=t;return n&&n["@ts-pattern/__patternKind"]===a.PatternType.Guard&&"function"==typeof n["@ts-pattern/__when"]}(t))return Boolean(t["@ts-pattern/__when"](n));if((e=t)&&e["@ts-pattern/__patternKind"]===a.PatternType.Not)return!p(t["@ts-pattern/__pattern"])(n);var e;if(f(t)&&c(n))return n.every((function(n){return p(t[0])(n)}));if(typeof t!=typeof n)return!1;if(c(t)&&c(n))return t.length===n.length&&t.every((function(t,e){return p(t)(n[e])}));if(n instanceof Map&&t instanceof Map)return u(t.keys()).every((function(e){return p(t.get(e))(n.get(e))}));if(n instanceof Set&&t instanceof Set){var r=u(t.values()),o=u(n.values());return 0===r.length?0===o.length:1===r.length?r.every((function(t){return Object.values(a.__).includes(t)?p([t])(o):n.has(t)})):r.every((function(t){return n.has(t)}))}return i(n)&&i(t)?Object.keys(t).every((function(e){return p(t[e])(n[e])})):n===t}},_=function(t){return function(n){var e;return s(t)?((e={})[t["@ts-pattern/__key"]]=n,e):f(t)&&c(n)?n.map((function(n){return _(t[0])(n)})).reduce((function(t,n){return Object.keys(n).reduce((function(t,e){return t[e]=(t[e]||[]).concat([n[e]]),t}),t)}),{}):c(t)&&c(n)?t.length<=n.length?t.reduce((function(t,e,r){return Object.assign(t,_(e)(n[r]))}),{}):{}:i(t)&&i(n)?Object.keys(t).reduce((function(e,r){return Object.assign(e,_(t[r])(n[r]))}),{}):{}}}},138:(t,n,e)=>{t.exports=e(176)}},n={},e=function e(r){if(n[r])return n[r].exports;var u=n[r]={exports:{}};return t[r].call(u.exports,u,u.exports,e),u.exports}(138);tsPattern=e})();  
  const { match, __ } = tsPattern;

  const handleId = "appWindowHandle";
  const getHandle = () => sp.GetStoredHandle(handleId);
  const setHandle = h => sp.StoreHandle(handleId, new IntPtr(parseInt(h)));
  const popup =  (msg, title) => sp.MessageBox(msg, title);
  const getWindow = () => sp.WindowFromHandle(getHandle());
  const expand = (envvar) => sp.ExpandEnvironmentVariables(envvar);
  const debug = obj => sp.ShowBalloonTip(Object.keys(obj)[0], `${JSON.stringify(Object.values(obj)[0])}`, "Info", 5000);

  try {
    const msg = JSON.parse(val);

    debug({ PostedMessage: msg });

    match(msg)
      .with({ StrokesPlusHTMLWindow: {}}, ({ StrokesPlusHTMLWindow }) => {
        setHandle(StrokesPlusHTMLWindow.Handle);
        //getWindow().Maximize();
      })
      .with({ action: "close" }, () => getWindow().SendClose())
      .with({ action: "link" }, ({ data }) => popup(data, "A link!"))
      .with({ action: "search" }, ({ data }) => popup(data, "searching..."))
      .with({ action: "expand" }, ({ data }) => popup(expand(data), "Expanded!"))
      .with(__.number, num => popup(num, "A Number!"))
      .with(__.string, str => popup(str, "A String!"))
      .with(__, any => popup(any, "catch all"))
      .run();
  } catch (err) {
    popup(err.toString(), "HtmlWindow Error");
  }
}

function HtmlWindow({ messageHandler, templateFile, templateData, windowTitle, windowOnLoad }) {
    const template = File.ReadAllText(templateFile);
    const interpolated = template.replace(/<%([^%]+)%>/g, match => {
        const trimmed = match.slice(2, -2).trim();
        const value = templateData[trimmed];
        return typeof value !== "undefined" ? value : `<% ${trimmed} %>`;
    });

    sp.HTMLWindow(windowTitle, interpolated, messageHandler, windowOnLoad || "", "", true);
    //sp.HTMLWindowExecuteScriptAsync(getHandle(), "alert('Hello!');");
}

HtmlWindow({
    messageHandler: "processMessage",
    windowTitle: "Ephemeral App",
    windowOnLoad: "//alert('Window Loaded');", // In context of the window, not here
    templateFile: String.raw`C:\Users\Public\shop\automation\demos\html\index.html`,
    templateData: {
      navbarHeading: "Harris & Bruno",
    }
});

//var files = sp.GetSelectedFilesInExplorer(sp.ForegroundWindow().HWnd);
//$.alert(files);
