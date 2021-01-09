const {
  BorderStyle,
  Form,
  FormBorderStyle,
  WebBrowser
} = forms.System.Windows.Forms;

class WebView {  
  constructor() {
    this.BORDER_THICKNESS = 8;
    this.RATIO = 16/9;
  }
  
  show(html) {
    this.width = 600;
    this.height = Math.floor(this.width / this.RATIO);
    
    this._browser = new WebBrowser();
    this._browser.Width = this.width;    
    this._browser.Height = this.height;
    
    this._form = new Form();
    this._form.Text = "Scripty WebView"
    this._form.MaximizeBox = false;
    this._form.MinimizeBox = false;
    this._form.FormBorderStyle = FormBorderStyle.FixedToolWindow;
    this._form.Width = this.width + (this.BORDER_THICKNESS * 2);
    this._form.Height = this.height;
    
    this.html = "<h1>Scripty WebView</h1>";
    this.css = String.raw`
      html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}table{border-collapse:collapse;border-spacing:0}
      html, body {
          margin: 0;
          padding:0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: cyan;
      }
    `;
    
      //<script type="text/javascript" src="https://unpkg.com/vue"></script>
    this._browser.DocumentText = html || String.raw`
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
      <div id="div1">
        <p id="p1">This is a paragraph.</p>
        <p id="p2">This is another paragraph.</p>
      </div>
      <script>
        var para = document.createElement("p");
        var node = document.createTextNode("This is new.");
        para.appendChild(node);

        var element = document.getElementById("div1");
        element.appendChild(para);
      </script>
    </body>
    </html>`;
    
    this._browser.Document.InvokeScript("sayHello");
        
    this._form.Controls.Add(this._browser);
    this._form.ShowDialog(); // Blocking!
    this._dispose();
  }
    
  _dispose() {
    this._browser.Dispose();
    this._form.Dispose();
  };
}

module.exports = WebView;

