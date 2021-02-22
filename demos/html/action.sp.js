var hasProp = (k, o) => typeof o[k] !== "undefined";

var handleStoreFactory = (handleId) => ({ 
    getHandle: () => sp.GetStoredHandle(handleId),
    setHandle: (handle) => sp.StoreHandle(handleId, handle)
});

var template = (templatePath, data) => {
    return File.ReadAllText(templatePath).replace(/\<\%([^%]+)\%\>/g, (match) => {
		const trimmed = match.slice(2, -2).trim();
		const value = data[trimmed];
		return typeof value !== "undefined" ? value : `<% ${trimmed} %>`;
    });
}

function processMessage(val) {
    try {
        const { getHandle, setHandle } = handleStoreFactory("appWindowHandle");
        const getWindow = (handle) => sp.WindowFromHandle(handle);
        const postedMsg = JSON.parse(val);
        
        if (hasProp("StrokesPlusHTMLWindow", postedMsg)) {
            const handle = new IntPtr(parseInt(postedMsg.StrokesPlusHTMLWindow.Handle));
            setHandle(handle);
            getWindow(handle).Maximize();
        } else {
            if (hasProp("action", postedMsg)) {
                switch(postedMsg.action) {
                    case "search":
                        sp.MessageBox(postedMsg.data, "Searching");
                        break;

                    case "close":
                        //getWindow(getHandle()).SendClose();
                        break;

                    default:
                        sp.MessageBox(`"${postedMsg.action}" is not a valid action`, "Bad Action");
                        break;
                }
            }
            
            if (typeof postedMsg === "string") {
                sp.MessageBox(postedMsg, "STRING");
            }
        }
    } catch (err) {
        sp.MessageBox(err.toString(), "INIT ERROR");
    }
}

function HtmlWindow(title, html, msgBusHandler, windowOnLoadScript = "") {
    if (typeof this[msgBusHandler] !== "function") {
        throw Error(`"${msgBusHandler}" is not a function`);
    }

    sp.HTMLWindow(title, html, msgBusHandler, windowOnLoadScript,  "", true);
}

var html = template(String.raw`Z:\Employees\Shaggy\harris-bruno\app.html`, {
    navbarHeading: "Harris & Bruno"
});

HtmlWindow("Frame Title", html, "processMessage");

// Assumes you are using the Example from HTMLWindow
//sp.HTMLWindowExecuteScriptAsync(sp.GetStoredHandle("testWindowHandle"), "alert('Hello!');");

//var files = sp.GetSelectedFilesInExplorer(sp.ForegroundWindow().HWnd);
//$.alert(files);