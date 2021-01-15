class DemoWebView { 
  width = 400;
  // height = 280; // Be explicit about height, or
  ratio = 16/9;// Leave off the height and apply an aspect ratio 
  // Passed into the `html` as `$data.xxx` down below
  data = { currentCulture: sp.GetCurrentCulture() };
  // This lands in the <head></head>
  css = String.raw`
    body {filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);}
    p,li {color: white;font: 0.8em sans-serif;margin-bottom:10px;}
    .box {margin: 10px;display: inline-block;}`;
  // This is the <body>{html}</body>  
  html = String.raw`
    <div class="box">
      <ul id="list">
        <li>Dimensions: {{ $view.width }} x {{ $view.height }}</li>
        <li>Aspect Ratio: {{ $view.ratio }}</li>
        <li>Current Culture: {{ $data.currentCulture }}</li>
        <li></li>
      <ul>
    </div>`;
  // Called when the view is visible and ready `window.onload`
  onLoad = String.raw`
    var ul = document.getElementById("list");
    ul.lastChild.innerHTML = "User Agent: onLoad started timeout...";
    setTimeout(function() { return ul.lastChild.innerHTML = "User Agent: " +navigator.userAgent}, 1000);`;
}

module.exports = DemoWebView;