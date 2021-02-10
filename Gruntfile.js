module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  const fix = grunt.option('fix') || false;

  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc.json',
        fix,
        //format: 'html',
        //outputFile: 'report.html',
      },
      target: [
        './src/**/*.js',
        './tools/**/*.js'
      ]
    },
    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'ls'
        },
        another: 'ls ./src' // Shorthand
    },
    msbuild: {
      release: {
        src: ['ScriptsPlusPlugin.csproj'],
        options: {
          projectConfiguration: 'Release',
          targets: ['Clean', 'Rebuild'],
          maxCpuCount: 2,
          buildParameters: {
            WarningLevel: 2
          },
          inferMsbuildPath: true
        }
      }
    }
  });

  grunt.registerTask('default', ['eslint']);
  grunt.registerTask('compile', ['msbuild']);
};