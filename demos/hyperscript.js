var html = 
    h('div#id.cls.cls2[attr1=val1][style=background-color:#ff0000; position:relative]',
      h('h1', {class: ['title']}, 'The Title'),
      h('p.content', 'The content'),
    );

$.webview.show({
  html,
  width: 600,
  ratio: 16/9
});