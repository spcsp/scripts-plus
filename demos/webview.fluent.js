$.webview.title($.env.HOSTNAME).width(400).ratio(16/9)
.data({
    currentCulture: sp.GetCurrentCulture()
})
.onLoad(`
    var ul = document.getElementById("list");
    ul.lastChild.innerHTML = "User Agent: onLoad started timeout...";
    setTimeout(function() { return ul.lastChild.innerHTML = "User Agent: " +navigator.userAgent}, 1000);
`)
.css(`
    body {filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#1e5799', endColorstr='#7db9e8', GradientType=0);}
    p,li {color: white;font: 0.8em sans-serif;margin-bottom:10px;}
    .box {margin: 10px;display: inline-block;}
`)
.html(`
    <div class="box">
        <ul id="list">
            <li>Dimensions: {{ $view.width }} x {{ $view.height }}</li>
            <li>Aspect Ratio: {{ $view.ratio }}</li>
            <li>Current Culture: {{ $data.currentCulture }}</li>
            <li></li>
        <ul>
    </div>
`)
.show();