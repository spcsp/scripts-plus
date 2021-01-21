(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { HyperScript } = require('hyperscript-html');

module.exports = HyperScript();
},{"hyperscript-html":2}],2:[function(require,module,exports){
'use strict'
const {isEmpty, hyperflexible, flattened} = require('./utils.js')
const {toStyleStr, zenhand} = require('zenhand')


const special = {
  'area': true, 'base': true, 'br': true, 'col': true, 'command': true, 'embed': true, 'hr': true, 'img': true, 'input': true,
  'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true, 'track': true, 'wbr': true
}

function HyperScript({tab='\t', nl='\n', attrsNewLine=true, prettyPrint=true,
  flexibleArgs=true, voidElements=true, shortHand=true}={}) {
  tab = prettyPrint ? tab : ''
  nl = prettyPrint ? nl : ''  // nl: newline.

  return flexibleArgs ? hyperflexible.bind(null, hyperscript) : hyperscript

  function hyperscript(type, attrs, ...children) {
    // Prep args, make defaults.
    attrs = !attrs ? {} : {...attrs}
    attrs.class = [...(attrs.class || []), ...(attrs.className || [])]
    attrs.className = null
    attrs.style = !attrs.style ? {} : {...attrs.style}

    // Merge all attrs from selector str and 2nd arg obj.
    if (shortHand && typeof type === 'string') {
      var sh = zenhand(type, {changeStyleCase:true})

      type = sh.tag

      if (!isEmpty(sh.attrs.class))
        attrs.class = [...sh.attrs.class, ...attrs.class]

      if (!isEmpty(sh.attrs.style))
        attrs.style = {...sh.attrs.style, ...attrs.style}

      attrs = {...sh.attrs, ...attrs}
    }

    // Start opening tag.
    var el = `<${type}`

    // Add attributes to tag.
    for (var i = 0, k, v, keys = Object.keys(attrs); k = keys[i++], v = attrs[k], k;) {
      if (isEmpty(v)) continue
      el += `${attrsNewLine ? nl : ''} ${k}="${k == 'class' ? v.join(' ') : k == 'style' ? toStyleStr(v, 'camel', 'kebab') : v}"`
    }

    // End opening tag.
    el += '>'

    // Add children within element.
    if (!isEmpty(children)) {
      if (prettyPrint) {
        // i: index, c: child.
        flattened(children, (i, c) => {
          el += `${nl}${tab}${c.split(nl).join(nl + tab)}`
        })
      }
      else {
        flattened(children, (i, c) => el += c)
      }
    }
    // Check for empty void-elements, and leave off the closing tag.
    else if (voidElements && special[type]) {
      return el
    }

    // Add closing tag.
    el += `${nl}</${type}>`

    return el
  }
}

function wrap(elements, opts={}) {
  if (!elements || isEmpty(elements))
    return

  let h = HyperScript({...opts, shortHand: false})
  let wrapped = {}

  for (let k in elements) {
    if (elements.hasOwnProperty(k)) {
      wrapped[k] = h.bind(null, elements[k])
    }
  }

  return wrapped
}

module.exports = {HyperScript, wrap}

},{"./utils.js":3,"zenhand":4}],3:[function(require,module,exports){
'use strict'

var hasOwnProperty = Object.prototype.hasOwnProperty


function isEmpty(obj) {
  if (obj) {
    let len = obj.length
    len = len == null ? obj.size : len

    if (len)
      return false
    else if (len === 0)
      return true

    for (var k in obj)
      return false
  }

  return true
}

var isArray = Array.isArray

function isObject(obj) {
  return obj != null && typeof obj === 'object'
}

function isDict(obj) {
  return obj != null && !isArray(obj) && typeof obj === 'object'
}

var isMap = isDict

// A wrapper function that provides a flexible arg interface for hyperscript.
function hyperflexible(fn, a, b, ...c) {
  if(b == null || isDict(b))
    return fn(a, b, ...c)

  return fn(a, null, b, ...c)
}

// A function to flatten the child items and arrays passed to hyperscript.
function flattened(arr, fn) {
  for (var i = 0, v; v = arr[i]; i++) {
    if (Array.isArray(v))
      flattened(v, fn)
    else
      fn(i, v)
  }
}

module.exports = {isEmpty, isArray, isObject, isDict, isMap, hyperflexible, flattened}

},{}],4:[function(require,module,exports){
var cases = {
  camel: [/[a-z][A-Z]/, (a, b) => a.toLowerCase() + b.toUpperCase()],
  kebab: [/.-./, (a, b) => a + '-' + b.toLowerCase()],
  snake: [/._./, (a, b) => a + '_' + b.toLowerCase()],
}

function kase(from, to, str) {
  return str.replace(cases[from][0], m => cases[to][1](m[0], m[m.length - 1]))
}

function toStyleStr(obj, caseFrom, caseTo) {
  if (!obj) return
  var acc = []

  for (var keys = Object.keys(obj), i = 0, k, v; k = keys[i++], v = obj[k], k;) {
    if (caseFrom && caseTo)
      k = kase(caseFrom, caseTo, k)
    acc.push(`${k}:${v};`)
  }

  return acc.join(' ')
}

function fromStyleStr(str, caseFrom, caseTo) {
  if (!str) return
  var obj = {}
  var pairs = str.split(/\s*;\s*/)

  for (var i = 0, k, v, cur; cur = pairs[i++];) {
    [k, v] = cur.split(/\s*:\s*/, 2)
    if (caseFrom && caseTo)
      k = kase(caseFrom, caseTo, k)
    obj[k] = v
  }

  return obj
}

var re = /(?:[#.](.*?)(?=[#.\[]|$))|(?:\[((?:(.*?)=(.*?))|(.*?))(?=\]))|(^[^#.\[]*?(?=[#.\[]|$))/g
function zenhand(str, {changeStyleCase=true}={}) {
  let obj = {tag: 'div', attrs: {class: [], style: {}}}

  for (let m, t; m = re.exec(str);) {
    if (m.index === re.lastIndex) re.lastIndex++
    t = m[0][0]
    switch (t) {
      case '#':
        obj.attrs.id = m[1]
        break
      case '.':
        obj.attrs.class.push(m[1])
        break
      case '[':
        var [,,, k, v] = m
        k = k == null ? m[5] : k

        switch (k) {
          // Process style string into obj.
          case 'style':
            if (changeStyleCase)
              var caseFrom = 'kebab', caseTo = 'camel'
            v = fromStyleStr(v, caseFrom, caseTo)
            obj.attrs.style = v
            break
          case 'class':
            obj.attrs.class.push(v)
          default:
            obj.attrs[k] = v || true
        }
        break
      default:
        obj.tag = m[6]
    }
  }

  return obj
}


module.exports = {kase, toStyleStr, fromStyleStr, zenhand}

},{}]},{},[1]);
