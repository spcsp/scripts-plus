const REQUIRE_JS = String.raw`http://requirejs.org/docs/release/2.3.6/minified/require.js`;

function R() {
  const result = $.request(REQUIRE_JS);
    
  return eval(result);
}

module.exports = R;