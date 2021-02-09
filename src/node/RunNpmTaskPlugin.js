const execa = require("execa");
const validateOptions = require("schema-utils");

const schema = {
  type: 'object',
  properties: {
    task: { type: 'string' }
  }
};

class RunNpmTaskPlugin {
  constructor(options = {}) {
    this.schema = schema;
    
    validateOptions(this.schema, options, 'Run Npm Task Plugin');    
    
    this.options = options;
  }
  
  apply(compiler) {
    compiler.hooks.afterDone.tap('RunNpmTaskPlugin', (compilation) => {
      console.log("Compiling bundle into DLL");
      
      execa.sync("npm", ["run", this.options.task]);
      
      console.log("Done!");
    });
  }
}

module.exports = RunNpmTaskPlugin;