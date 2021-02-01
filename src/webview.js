const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

class WebView {
  constructor() {
    //this._views = __autoloaded_webviews;
    this._form = null;
    this._browser = null;
    
    this.waterCss = false;
    this.embedJquery = false;
    this.html = "<p>Hello World!</p>";
  }
  
  get document() {
    return `<!DOCTYPE html>
      <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${this.getHead()}
      </head>
      <body>${this.getBody()}</body>  
      </html>`;
  }
  
  get templateData() {
    const $view = {
      title: this.title,
      ratio: this.ratio,
      width: this.width,
      height: this.height
    };
    
    return Object.assign({}, { $view }, this.data);
  }
  
  /**
   * Main method for rendering a WebView class
   */
  show(config) { 
    this.title = config.constructor.name;
      
    Object.assign(this, config);
    
    this._calculateDimensions();
    this._initBrowser();
    this._initForm();
    this._form.ShowDialog(); // Blocking!
    this._browser.Dispose();
    this._form.Dispose();
  }
  
  getHead() {
    const styles = [
      //this._style(this.CSS_RESET),
      this._style(`html,body {width: 100%;height: ${this.height}px;overflow: hidden;}`),
      this.waterCss ? this._style(this.WATER_CSS) : false,
      this.css ? this._style(this.css) : false
    ];
    
    const scripts = [
      this._script(this.JSON),
      this.embedJquery ? this._script(this.JQUERY) : false,
      this._eventHandler(this.onLoad, "window.onload"),
      this._eventHandler(this.onKeyUp, "document.onkeyup"),
      this._eventHandler(this.onMouseUp, "document.onmouseup")
    ];
    
    return [...styles, ...scripts].filter(Boolean).join("\n");
  }
  
  getBody() {
    return this._interpolateVars(this.html, this.templateData);
  }
  
  _calculateDimensions() {
    if (!this.width) this.width = 480;        
    if (!this.width && !this.ratio) this.ratio = 4/3;
    if (!this.height) this.height = Math.floor(this.width / this.ratio);
  }
  
  _initForm() {
    this._form = new Form();
    this._form.Text = this.title;
    this._form.MaximizeBox = false;
    this._form.MinimizeBox = false;
    this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
    this._form.Width = this.width + (this.BORDER_THICKNESS * 2); // L & R
    this._form.Height = this.height + this.BORDER_THICKNESS + 26; // <-- TITLEBAR!!
    this._form.Controls.Add(this._browser);
  }
  
  _initBrowser(debug = false) {
    clip.SetText(this.document);
    this._browser = new WebBrowser();
    this._browser.Width = this.width;    
    this._browser.Height = this.height;
    this._browser.DocumentText = this.document;
    this._browser.AllowWebBrowserDrop = false;
    this._browser.ScriptErrorsSuppressed = debug;
    this._browser.WebBrowserShortcutsEnabled = false;
    this._browser.IsWebBrowserContextMenuEnabled = false;
  }
  
  _interpolateVars(src, vars) {
    return src.replace(/{{.*?}}/g, match => {
      const key = match.replace(/{|}|\s/g, "");
      return vars[key] || `${key} key not found ind data`;
    });
  }  

  _eventHandler(functionBody, target) {
    if (typeof functionBody === "string") {
      return this._script(`${target} = function() { var e = window.event;
        ${functionBody}
      }`);
    }
    
    return "";
  }
  
  _style(input) {
    return `<style>${input}\n</style>`;
  }
  
  _script(input) {
    return `<script>${input}\n</script>`;
  }
  
  /* eslint-disable prettier/prettier */
  static BORDER_THICKNESS = 8;
  
  static CSS_RESET = String.raw`html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`;
  
  static DEFAULT_CSS = String.raw`
    body {filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);}
    p,li {color: white;font: 0.8em sans-serif;margin-bottom:10px;}
    .box {margin: 10px;display: inline-block;}`;

  // https://watercss.kognise.dev
  static WATER_CSS = String.raw`html{scrollbar-color:#324759 #202b38;scrollbar-width:thin}body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue','Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;line-height:1.4;max-width:800px;margin:20px auto;padding:0 10px;word-wrap:break-word;color:#dbdbdb;background:#202b38;text-rendering:optimizeLegibility}button{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}input{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}textarea{transition:background-color .1s linear,border-color .1s linear,color .1s linear,box-shadow .1s linear,transform .1s ease}h1{font-size:2.2em;margin-top:0}h1,h2,h3,h4,h5,h6{margin-bottom:12px;margin-top:24px}h1{color:#fff}h2{color:#fff}h3{color:#fff}h4{color:#fff}h5{color:#fff}h6{color:#fff}strong{color:#fff}b,h1,h2,h3,h4,h5,h6,strong,th{font-weight:600}q::before{content:none}q::after{content:none}blockquote{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}q{border-left:4px solid #0096bfab;margin:1.5em 0;padding:.5em 1em;font-style:italic}blockquote>footer{font-style:normal;border:0}blockquote cite{font-style:normal}address{font-style:normal}a[href^='mailto\:']::before{content:'📧 '}a[href^='tel\:']::before{content:'📞 '}a[href^='sms\:']::before{content:'💬 '}mark{background-color:#efdb43;border-radius:2px;padding:0 2px 0 2px;color:#000}button,input[type=button],input[type=checkbox],input[type=radio],input[type=range],input[type=submit],select{cursor:pointer}input:not([type=checkbox]):not([type=radio]),select{display:block}input{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}button{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}textarea{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}select{color:#fff;background-color:#161f27;font-family:inherit;font-size:inherit;margin-right:6px;margin-bottom:6px;padding:10px;border:none;border-radius:6px;outline:0}input[type=checkbox],input[type=radio]{height:1em;width:1em}input[type=radio]{border-radius:100%}input{vertical-align:top}label{vertical-align:middle;margin-bottom:4px;display:inline-block}button,input:not([type=checkbox]):not([type=radio]),input[type=range],select,textarea{-webkit-appearance:none}textarea{display:block;margin-right:0;box-sizing:border-box;resize:vertical}textarea:not([cols]){width:100%}textarea:not([rows]){min-height:40px;height:140px}select{background:#161f27 url("data:image/svg+xml;charset=utf-8,%3C?xml version='1.0' encoding='utf-8'?%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='62.5' width='116.9' fill='%23efefef'%3E %3Cpath d='M115.3,1.6 C113.7,0 111.1,0 109.5,1.6 L58.5,52.7 L7.4,1.6 C5.8,0 3.2,0 1.6,1.6 C0,3.2 0,5.8 1.6,7.4 L55.5,61.3 C56.3,62.1 57.3,62.5 58.4,62.5 C59.4,62.5 60.5,62.1 61.3,61.3 L115.2,7.4 C116.9,5.8 116.9,3.2 115.3,1.6Z'/%3E %3C/svg%3E") calc(100% - 12px) 50%/12px no-repeat;padding-right:35px}select::-ms-expand{display:none}select[multiple]{padding-right:10px;background-image:none;overflow-y:auto}button,input[type=button],input[type=submit]{padding-right:30px;padding-left:30px}button:hover{background:#324759}input[type=submit]:hover{background:#324759}input[type=button]:hover{background:#324759}input:focus{box-shadow:0 0 0 2px #0096bfab}select:focus{box-shadow:0 0 0 2px #0096bfab}button:focus{box-shadow:0 0 0 2px #0096bfab}textarea:focus{box-shadow:0 0 0 2px #0096bfab}button:active,input[type=button]:active,input[type=checkbox]:active,input[type=radio]:active,input[type=range]:active,input[type=submit]:active{transform:translateY(2px)}button:disabled,input:disabled,select:disabled,textarea:disabled{cursor:not-allowed;opacity:.5}::-moz-placeholder{color:#a9a9a9}:-ms-input-placeholder{color:#a9a9a9}::-ms-input-placeholder{color:#a9a9a9}::placeholder{color:#a9a9a9}fieldset{border:1px #0096bfab solid;border-radius:6px;margin:0;margin-bottom:12px;padding:10px}legend{font-size:.9em;font-weight:600}input[type=range]{margin:10px 0;padding:10px 0;background:0 0}input[type=range]:focus{outline:0}input[type=range]::-webkit-slider-runnable-track{width:100%;height:9.5px;-webkit-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-webkit-slider-thumb{box-shadow:0 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980;-webkit-appearance:none;margin-top:-7px}input[type=range]:focus::-webkit-slider-runnable-track{background:#161f27}input[type=range]::-moz-range-track{width:100%;height:9.5px;-moz-transition:.2s;transition:.2s;background:#161f27;border-radius:3px}input[type=range]::-moz-range-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]::-ms-track{width:100%;height:9.5px;background:0 0;border-color:transparent;border-width:16px 0;color:transparent}input[type=range]::-ms-fill-lower{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-fill-upper{background:#161f27;border:.2px solid #010101;border-radius:3px;box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d}input[type=range]::-ms-thumb{box-shadow:1px 1px 1px #000,0 0 1px #0d0d0d;border:1px solid #000;height:20px;width:20px;border-radius:50%;background:#526980}input[type=range]:focus::-ms-fill-lower{background:#161f27}input[type=range]:focus::-ms-fill-upper{background:#161f27}a{text-decoration:none;color:#41adff}a:hover{text-decoration:underline}code{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}samp{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}time{background:#161f27;color:#ffbe85;padding:2.5px 5px;border-radius:6px;font-size:1em}pre>code{padding:10px;display:block;overflow-x:auto}var{color:#d941e2;font-style:normal;font-family:monospace}kbd{background:#161f27;border:1px solid #526980;border-radius:2px;color:#dbdbdb;padding:2px 4px 2px 4px}img,video{max-width:100%;height:auto}hr{border:none;border-top:1px solid #526980}table{border-collapse:collapse;margin-bottom:10px;width:100%;table-layout:fixed}table caption{text-align:left}td,th{padding:6px;text-align:left;vertical-align:top;word-wrap:break-word}thead{border-bottom:1px solid #526980}tfoot{border-top:1px solid #526980}tbody tr:nth-child(even){background-color:#1a242f}::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:#161f27;border-radius:6px}::-webkit-scrollbar-thumb{background:#324759;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#415c73}::-moz-selection{background-color:#1c76c5;color:#fff}::selection{background-color:#1c76c5;color:#fff}details{display:flex;flex-direction:column;align-items:flex-start;background-color:#1a242f;padding:10px 10px 0;margin:1em 0;border-radius:6px;overflow:hidden}details[open]{padding:10px}details>:last-child{margin-bottom:0}details[open] summary{margin-bottom:10px}summary{display:list-item;background-color:#161f27;padding:10px;margin:-10px -10px 0;cursor:pointer;outline:0}summary:focus,summary:hover{text-decoration:underline}details>:not(summary){margin-top:0}summary::-webkit-details-marker{color:#dbdbdb}footer{border-top:1px solid #526980;padding-top:10px;color:#a9b1ba}body>footer{margin-top:40px}@media print{body,button,code,details,input,pre,summary,textarea{background-color:#fff}button,input,textarea{border:1px solid #000}body,button,code,footer,h1,h2,h3,h4,h5,h6,input,pre,strong,summary,textarea{color:#000}summary::marker{color:#000}summary::-webkit-details-marker{color:#000}tbody tr:nth-child(even){background-color:#f2f2f2}a{color:#00f;text-decoration:underline}}`;
  
/* eslint-enable prettier/prettier */
}

module.exports = new WebView();
