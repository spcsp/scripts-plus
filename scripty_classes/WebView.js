const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

class WebView {
  constructor() {
    this.BORDER_THICKNESS = 8;
    this.CSS_RESET = String.raw`html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`;
    
    this._title = "Scripty WebView";
    this._width = 600;
    this._ratio = 16/9;
    this._height = Math.floor(this._width / this._ratio);
    this._html = `<pre>Scripty WebView</pre>`;
  }
  
  title(input) {
    this._title = input;
    return this;
  }
  
  height(input) {
    this._height = input;
    return this;
  }
  
  width(input) {
    this._width = input;
    return this;
  }
  
  ratio(input) {
    this._ratio = input;
    return this;
  }
  
  css(input) {
     this._css = input;
     return this;
  }
  
  html(input) {
     this._html = input;
     return this;
  }
  
  data(input) {
     this._data = input;
     return this;
  }
  
  show() {
    this._browser = new WebBrowser();
    this._browser.Width = this._width;    
    this._browser.Height = this._height;
    
    //this._browser.ObjectForScripting = {};
    
    this._browser.AllowWebBrowserDrop = false;
    //this._browser.ScriptErrorsSuppressed = true; // Debugging
    this._browser.WebBrowserShortcutsEnabled = false;
    this._browser.IsWebBrowserContextMenuEnabled = false;
    
    this._form = new Form();
    this._form.Text = this._title;
    this._form.MaximizeBox = false;
    this._form.MinimizeBox = false;
    this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
    this._form.Width = this._width + (this.BORDER_THICKNESS * 2); // L & R
    this._form.Height = this._height + this.BORDER_THICKNESS + 26; // <-- TITLEBAR!!
    
    const systemInfo = {
      __WIDTH: this._width,
      __HEIGHT: this._height
    };
    
    this._html = this._interpolateVars(this._html, {...systemInfo, ...this._data});
    
    this._page = String.raw`
    <!DOCTYPE html>
    <html>
    <head>
    <script>
      function test(message) { alert(message); }
    </script>
    <style>${this.CSS_RESET}</style>
    <style>
      html,body {
        width: 100%;
        height: ${this._height}px;
        overflow: hidden;
      }
    </style>
    <style>${this._css}</style>
    </head>
    <body>
    <button onclick="test()"></button>
    ${this._html}</body>
    </html>`;
    
    this._browser.DocumentText = this._page;
        
    this._form.Controls.Add(this._browser);
    this._form.ShowDialog(); // Blocking!
    this._dispose();
  }
  
  _interpolateVars(src, vars) {
    return src.replace(/{{.*?}}/g, match => {
      return vars[match.replace(/{|}|\s/g, "")];
    });
  }
  
  _dispose() {
    this._browser.Dispose();
    this._form.Dispose();
  };
}

module.exports = WebView;

