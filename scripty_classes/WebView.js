const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

const style = str => `<style>${str}</style>`;
const script = str => `<script>${str}</script>`;
const stringify = arr => arr.join("\n");
const dotProp = (obj, str) => str.split('.').reduce((o,i) => o[i],obj)

class WebView {
  constructor({ __autoloaded_webviews }) {
    this.CSS_RESET = String.raw`html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`;
    this.BORDER_THICKNESS = 8;
    
    this._title = "Scripty WebView";
    this._views = __autoloaded_webviews;    
  }
  
  get views() {
    return this._views.reduce((v, m) => ({...v, ...{ [m.name]: m.module }}), {});
  }
  
  get _head() {
    const styles = [
      style(this.CSS_RESET),
      style(`html,body {width: 100%;height: ${this._height}px;overflow: hidden;}`),
      style(this._css)
    ];
    
    const scripts = [
      script(this._headScript),
      script(`window.onload = function() {
        var e = window.event;
        ${this._onload}
      }`),
      script(`document.onmouseup = function() {
        var e = window.event;
        ${this._onmouseup}
      }`),
      script(`document.onkeyup = function() {
        var e = window.event;
        ${this._onkeyup}
      }`)
    ];
    
    return stringify(styles) + stringify(scripts);
  }
  
  get _body() {
    const html = this._html + script(this._bodyScript);
    
    return this._interpolateVars(html, {
      ...{ $view: this._viewInfo},
      ...{ $data: this._data }
    });
  }
  
  get calculatedHeightByRatio() {
    return Math.floor(this._width / this._ratio);
  }

  get _viewInfo() {
    return {
      title: this._title,
      ratio: this._ratio,
      width: this._width,
      height: this._height
    };
  }
  
  show(viewClass) { 
    if (typeof viewClass === "string" ) {
      viewClass = this.views[viewClass];
    }
    
    if (viewClass) {
      const view = new viewClass();
            
      this.title(view.constructor.name);
      
      Object.keys(view).forEach(prop => {
        if (typeof view[prop] !== "undefined") this[prop](view[prop]);
      });
    }
    
    this._calculateDimensions();
    this._initBrowser();
    this._initForm();
    this._form.ShowDialog(); // Blocking!
    this._browser.Dispose();
    this._form.Dispose();
  }
  
  data(input) {
    this._data = input;
    return this;
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
  
  js(input) {
    this._bodyScript = input;
    return this;
  }
  
  html(input) {
    this._html = input;
    return this;
  }
  
  onLoad(src) {
    this._onload = src;
    return this;
  }
  
  onMouseUp(src) {
    this._onmouseup = src;
    return this;
  }
  
  onKeyUp(src) {
    this._onkeyup = src;
    return this;
  }
    
  _interpolateVars(src, vars) {
    return src.replace(/{{.*?}}/g, match => {
      return dotProp(vars, match.replace(/{|}|\s/g, ""));
    });
  }
  
  _calculateDimensions() {
    if (typeof this._width !== "number") {
      this._ratio = 480;
    }
        
    if (typeof this._width !== "number" && typeof this._ratio) {
      this._ratio = 4/3;
    }
    
    if (typeof this._height !== "number") {
      this._height = this.calculatedHeightByRatio;
    }
  }
  
  _initForm() {
    this._form = new Form();
    this._form.Text = this._title;
    this._form.MaximizeBox = false;
    this._form.MinimizeBox = false;
    this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
    this._form.Width = this._width + (this.BORDER_THICKNESS * 2); // L & R
    this._form.Height = this._height + this.BORDER_THICKNESS + 26; // <-- TITLEBAR!!
    this._form.Controls.Add(this._browser);
  }
  
  _initBrowser(debug = false) {
    this._browser = new WebBrowser();
    this._browser.Width = this._width;    
    this._browser.Height = this._height;
    this._browser.ScriptErrorsSuppressed = debug;
    this._browser.AllowWebBrowserDrop = false;
    this._browser.WebBrowserShortcutsEnabled = false;
    this._browser.IsWebBrowserContextMenuEnabled = false;
    this._browser.DocumentText = `<!DOCTYPE html>
      <html>
      <head>${this._head}</head>
      <body>${this._body}</body>  
      </html>`;
  }
}

module.exports = WebView;
