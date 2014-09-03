module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        expand: true,
        cwd: 'app',
        src: ['*.html'],
        dest: 'app/dist'
      }
    }, // htmlmin



    sass : {
      dist : {
        options : { style : 'compressed' },
        files : {
          'app/dist/css/style.css' : 'app/assets/_sass/style.scss'
        }
      }
    }, // sass 



    uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          'app/dist/js/main.js' : [ 'app/assets/_js/script.js' ]
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
                  cwd: './app/images/',
                  src: ['**/*.png'],
                  dest: './app/dist/images',
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
                  cwd: './app/images/',
                  src: ['**/*.jpg'],
                  dest: './app/dist/images',
                  ext: '.jpg'
              }
          ]
      }
    }, // imagemin

    watch : {
      dist : {
        files : [
          'app/assets/_js/**/*',
          'app/assets/_sass/**/*',
          'app/images/**/*',
          'app/*.html'
        ],

        tasks : [ 'htmlmin', 'uglify', 'sass', 'copy', 'browserSync' ]
      }
    }, // watch

    copy: {
      main: {
      files: [
        {
          cwd: 'app/fonts',  // set working folder / root to copy
          src: '**/*',           // copy all files and subfolders
          dest: 'app/dist/fonts',    // destination folder
          expand: true           // required when using cwd
        },

        { 
          cwd: 'app',
          src: ['apple-touch-icon-precomposed.png', '.htaccess', '*.txt', 'manifest.webapp'],
          dest:'app/dist',
          expand: true 
        },

        { 
          cwd: 'app/assets/_js',
          src:'modernizr.min.js',
          dest:'app/dist/js',
          expand: true 
        },
      ]
    }
  }, // copy

   browserSync: {
        files: {

            // Aplicando o recurso de Live Reload nos seguintes arquivos
            src : [
                'app/dist/css/*.css',
                'app/dist/*.html'
            ],

        },
        options: {

            // Atribuíndo um diretório base
            server: {
                // Definindo um IP manualmente
                host : "localhost/",
                baseDir: "app/dist/"
            },

            // Integrando com a tarefa "watch"
            watchTask: true,

            // Sincronizando os eventos entre os dispositívos
            ghostMode: {
                scroll: true,
                links: true,
                forms: true
            }
        }
    }, //browser-sync

  });


  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-htmlmin' );
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-browser-sync' );
  


  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'htmlmin', 'sass', 'uglify', 'copy', 'browserSync' ] );

  // Tarefa para Watch
  grunt.registerTask( 'img', [ 'imagemin' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};