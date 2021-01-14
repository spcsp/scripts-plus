const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

const style = str => `<style>${str}</style>`;
const script = str => `<script>${str}</script>`;
const stringify = arr => arr.join("\n");
const dotProp = (obj, str) => str.split('.').reduce((o,i) => o[i], obj)

class WebView {
  constructor({ json2 }) {
    this.json = json2;
    
    this.CSS_RESET = String.raw`html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}`;
    this.BORDER_THICKNESS = 8;
    
    this._title = "Scripty WebView";
  }
  
  get _document() {
    return `<!DOCTYPE html><html><head>${this._head}</head><body>${this._body}</body></html>`;
  }
  
  get _head() {
    const styles = [
      style(this.CSS_RESET),
      style(`html,body {width: 100%;height: ${this._height}px;overflow: hidden;}`),
      style(this._css)
    ];
    
    return stringify(styles) + String.raw`
      <script>${this._headScript}</script>
      <script>
        window.onload = function() {
          ${this._onLoadScript}
        }
      </script>
      <script>
        window.onkeydown = function() {
          ${this._onKeyDownScript}
        }
      </script>`;
  }
  
  get _body() {
    const html = this._html + `<script>${this._bodyScript}</script>`;
    
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
      width: this._width,
      height: this._height,
      ratio: this._ratio,
      title: this._title
    };
  }
  
  create(opts) {
    Object.keys(opts).forEach(key => {
      if (typeof this[key] === "function") {
        this[key](opts[key]);
      }
    });
    
    return this;
  }
  
  /**
   * Always call last in the chain
   */
  show() {    
    this._calculateDimensions();
    this._initBrowser();
    this._initForm();
    this._form.ShowDialog(); // Blocking!
    this._dispose();
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
    this._onLoadScript = src;
    return this;
  }
  
  onKeyDown(src) {
    this._onKeyDownScript = src;
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
    this._browser.DocumentText = this._document;
    this._browser.ScriptErrorsSuppressed = debug;
    this._browser.AllowWebBrowserDrop = false;
    this._browser.WebBrowserShortcutsEnabled = false;
    this._browser.IsWebBrowserContextMenuEnabled = false;
  }
  
  _dispose() {
    this._browser.Dispose();
    this._form.Dispose();
  };
}

module.exports = WebView;

