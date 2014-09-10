module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({

    paths: {
      app:    'app/',
      assets: 'assets/',
      fonts:  'fonts/',
      sass:   'sass/',
      img:    'images/',
      js:     'js/',
      css:    'css/',
      wp:     'wp/',
      prod:   'dist/',
      // prod:   'wp/wp-content/themes/vtex-theme', // Wordpress

    }, // Pastas do projeto

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: '<%= paths.app %>',
        src: ['*.html'],
        dest: '<%= paths.app %><%= paths.prod %>'
      }
    }, // htmlmin



    sass : {
      dist : {
        options : { style : 'compressed' },
        files : {
          '<%= paths.app %><%= paths.prod %><%= paths.css %>style.css' : '<%= paths.app %><%= paths.assets %><%= paths.sass %>style.scss'
        }
      }
    }, // sass 



    uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          '<%= paths.app %><%= paths.prod %><%= paths.js %>main.js' : [ '<%= paths.app %><%= paths.assets %><%= paths.js %>script.js' ]
        }
      }
    }, // uglify



    imagemin: {
      png: {
          options: {
              optimizationLevel: 7
          },
          files: [
              {
                  expand: true,
                  cwd: '<%= paths.app %><%= paths.img %>',
                  src: ['**/*.png'],
                  dest: '<%= paths.app %><%= paths.prod %><%= paths.img %>',
                  ext: '.png'
              }
          ]
      },
      jpg: {
          options: {
              progressive: true
          },
          files: [
              {
                  expand: true,
                  cwd: '<%= paths.app %><%= paths.img %>',
                  src: ['**/*.jpg'],
                  dest: '<%= paths.app %><%= paths.prod %><%= paths.img %>',
                  ext: '.jpg'
              }
          ]
      }
    }, // imagemin

    watch : {
      dist : {
        files : [
          '<%= paths.app %><%= paths.assets %><%= paths.js %>**/*',
          '<%= paths.app %><%= paths.assets %><%= paths.sass %>**/*',
          '<%= paths.app %>*.html'
        ],

        tasks : [ 'htmlmin', 'uglify', 'sass', 'copy' ]
      }
    }, // watch

    copy: {
      main: {
        files: [
          {
            cwd: '<%= paths.app %><%= paths.fonts %>',  // set working folder / root to copy
            src: '**/*',           // copy all files and subfolders
            dest: '<%= paths.app %><%= paths.prod %><%= paths.fonts %>',    // destination folder
            expand: true           // required when using cwd
          },

          { 
            cwd: '<%= paths.app %>',
            src: ['apple-touch-icon-precomposed.png', '.htaccess', '*.php', '*.css', '*.txt', 'manutencao.html', 'manifest.webapp'],
            dest:'<%= paths.app %><%= paths.prod %>',
            expand: true 
          },

          { 
            cwd: '<%= paths.app %><%= paths.assets %><%= paths.js %>',
            src:'modernizr.min.js',
            dest:'<%= paths.app %><%= paths.prod %><%= paths.js %>',
            expand: true 
          },

          { 
            cwd: '<%= paths.app %><%= paths.images %>',
            src:'*.svg',
            dest:'<%= paths.app %><%= paths.prod %><%= paths.images %>',
            expand: true 
          },
        ]
      }
    }, // copy

    browserSync: {
      dev: {
          bsFiles: {
            src : [
            '<%= paths.app %><%= paths.prod %>**/*',
            ]
          },
          options: {
            proxy: "localhost/seu-projetos"
          }
      }
    }, // Browser-sync: sync navigation and file changes


    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.host', // host do servidor
          // port: 21,
          authKey: 'key1' // key do arquivo de password do plugin
        },
        src: '<%= paths.app %><%= paths.wp %>', // Pasta de onde serão enviados os arquivos
        dest: '/', // Pasta de destino no servidor Ex.: Httpdocs/Public_html
        // exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
      }
    }, //ftp deploy

  });


  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-browser-sync' );
  grunt.loadNpmTasks('grunt-ftp-deploy');
  


  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'htmlmin', 'sass', 'uglify', 'copy' ] );

  // Tarefa para Watch
  grunt.registerTask( 'img', [ 'imagemin' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

  // Sicronizando browsers
  grunt.registerTask( 'serve', [ 'browserSync' ] );

  // Deploy -  Mandando os arquivos de /dist para o servidor
  grunt.registerTask( 'deploy', [ 'ftp-deploy' ] );

};