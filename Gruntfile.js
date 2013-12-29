module.exports = function(grunt) {
  var sourceFiles = [
    // shapes
    'src/shapes/Crosshair.js'
  ];

  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dev: {
        src: sourceFiles,
        dest: 'dist/kinetic-plugins-dev.js'
      },
      beta: {
        src: sourceFiles,
        dest: 'dist/kinetic-plugins-v<%= pkg.version %>-beta.js'
      },
      prod: {
        src: sourceFiles,
        dest: 'dist/kinetic-plugins-v<%= pkg.version %>.js'
      }
    },
    replace: {
      dev: {
        options: {
          variables: {
            version: 'dev',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>',
            nodeParams: '<%= grunt.file.read("doc-includes/NodeParams.txt") %>',
            containerParams: '<%= grunt.file.read("doc-includes/ContainerParams.txt") %>',
            shapeParams: '<%= grunt.file.read("doc-includes/ShapeParams.txt") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/kinetic-plugins-dev.js'], 
          dest: 'dist/kinetic-plugins-dev.js'
        }]
      },
      beta: {
        options: {
          variables: {
            version: '<%= pkg.version %>-beta',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>',
            nodeParams: '<%= grunt.file.read("doc-includes/NodeParams.txt") %>',
            containerParams: '<%= grunt.file.read("doc-includes/ContainerParams.txt") %>',
            shapeParams: '<%= grunt.file.read("doc-includes/ShapeParams.txt") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/kinetic-plugins-v<%= pkg.version %>-beta.js'], 
          dest: 'dist/kinetic-plugins-v<%= pkg.version %>-beta.js'
        }]
      },
      prod1: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
            date: '<%= grunt.template.today("yyyy-mm-dd") %>',
            nodeParams: '<%= grunt.file.read("doc-includes/NodeParams.txt") %>',
            containerParams: '<%= grunt.file.read("doc-includes/ContainerParams.txt") %>',
            shapeParams: '<%= grunt.file.read("doc-includes/ShapeParams.txt") %>'
          },
          prefix: '@@'
        },

        files: [{
          src: ['dist/kinetic-plugins-v<%= pkg.version %>.js'], 
          dest: 'dist/kinetic-plugins-v<%= pkg.version %>.js'
        }]
      },
      prod2: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
          },
          prefix: '@@'
        },
        files: [{
          src: ['dist/kinetic-plugins-Global-v<%= pkg.version %>.min.js'], 
          dest: 'dist/kinetic-plugins-Global-v<%= pkg.version %>.min.js'
        }]
      },
      prod3: {
        options: {
          variables: {
            version: '<%= pkg.version %>',
          },
          prefix: '@@'
        },
        files: [{
          src: ['dist/kinetic-plugins-v<%= pkg.version %>.min.js'], 
          dest: 'dist/kinetic-plugins-v<%= pkg.version %>.min.js'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> http://www.kineticjs.com by Eric Rowell @ericdrowell - MIT License https://github.com/ericdrowell/KineticJS/wiki/License*/\n'
      },
      build: {
        files: {
          'dist/kinetic-plugins-v<%= pkg.version %>.min.js': 'dist/kinetic-plugins-v<%= pkg.version %>.js'
        }
      }
    },
    clean: {
      build: ['dist/*']
    },
    jshint: {
      options: {
        laxbreak: true
      },
      all: ['src/**/*.js']
    }
  };

  
  for (var n=0; n<sourceFiles.length; n++) {
    var inputFile = sourceFiles[n];
    var className = (inputFile.match(/[-_\w]+[.][\w]+$/i)[0]).replace('.js', '');
    var outputFile = 'dist/kinetic-plugins-' + className + '-v<%= pkg.version %>.min.js';

    config.uglify.build.files[outputFile] = [inputFile];
  }
  
  grunt.initConfig(config);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Tasks
  grunt.registerTask('dev', ['clean', 'concat:dev', 'replace:dev']);
  grunt.registerTask('beta', ['clean', 'concat:beta', 'replace:beta']);
  grunt.registerTask('full', ['clean', 'concat:prod', 'uglify', 'replace:prod1', 'replace:prod2', 'replace:prod3']);
  grunt.registerTask('hint', ['clean', 'concat:dev', 'replace:dev', 'jshint']);
};
