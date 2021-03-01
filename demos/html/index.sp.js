function HtmlWindow({
  messageHandler,
  templateFile,
  templateData,
  windowTitle,
  windowOnCreate
}) {
  const template = File.ReadAllText(templateFile);
  const interpolated = template.replace(/<%([^%]+)%>/g, match => {
    const trimmed = match.slice(2, -2).trim();
    const value = templateData[trimmed];
    return typeof value !== "undefined" ? value : `<% ${trimmed} %>`;
  });

  sp.HTMLWindow(
    windowTitle,
    interpolated,
    messageHandler,
    windowOnCreate || "",
    "",
    true
  );

//  return {
//   execAsync: script => sp.HTMLWindowExecuteScriptAsync(getHandle(), script)
//  };
}

function processMessage(jsonMsgStr) {
    const handleId = "appWindowHandle";

    const getHandle = () => sp.GetStoredHandle(handleId);
    const setHandle = h => sp.StoreHandle(handleId, new IntPtr(parseInt(h)));
    const getWindow = () => sp.WindowFromHandle(getHandle());

    const popup = sp.MessageBox;
    const debug = obj => sp.ShowBalloonTip(
        Object.keys(obj)[0],
        `${JSON.stringify(Object.values(obj)[0])}`,
        "Info",
        5000
    );

    const parseMessage = msg => {

        return payload;
    };

    const actions = {
        min: ({ window }) => window.Minimize(),
        max: ({ window }) => window.Maximize(),
        close: ({ window }) => window.SendClose(),
        center: ({ window}) => window.Center(),
        alpha: ({ window, data }) => window.Alpha = parseInt(data),
        link: ({ data }) => popup(data, "A link!"),
        search: ({ data }) => popup(data, "searching..."),
        expand: ({ data }) => popup(sp.ExpandEnvironmentVariables(data), "Expanded!"),
    };

    try {
        const payload = JSON.parse(jsonMsgStr);        

        if (typeof payload.StrokesPlusHTMLWindow !== "undefined") {
            setHandle(payload.StrokesPlusHTMLWindow.Handle);
        }

        debug({ PostedMessage: payload });

        if (typeof payload.action === "string" && actions.hasOwnProperty(payload.action)) {
            actions[payload.action]({ data: payload.data, window: getWindow() });
        }
    } catch (err) {
        popup(err.toString(), "HtmlWindow Error");
    }
}

var App = HtmlWindow({
  messageHandler: "processMessage",
  windowTitle: "Ephemeral App",
  templateFile: String.raw`C:\Users\kevin\projects\scripts-plus-plugin\demos\html\index.html`,
  templateData: {
    navbarHeading: "Ephemeral",
    navBarBtnClasses: "btn btn-sm btn-outline-secondary"
  }
});

//App.execAsync("alert('Hello!');");

//var files = sp.GetSelectedFilesInExplorer(sp.ForegroundWindow().HWnd);
//$.alert(files);