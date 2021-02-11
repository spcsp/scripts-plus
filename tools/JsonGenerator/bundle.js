const { join } = require('path');
const Parcel = require('parcel-bundler');

const index = join(__dirname, './index2.html');

const options = {
  outFile: 'index.html',
  publicUrl: '/',
  watch: true,
  bundleNodeModules: true
};

(async function() {
  const p = new Parcel(index, options);
  
  const bundle = await p.bundle();
})();