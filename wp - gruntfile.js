module.exports = function( grunt ) {

  "use strict";

  grunt.initConfig({

    sass : {
      dist : {
        options : { style : 'compressed' },
        files : {
          'wp/wp-content/themes/vtex-theme/css/style.css' : 'app/assets/_sass/style.scss'
        }
      }
    }, // sass 



    uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          'wp/wp-content/themes/vtex-theme/js/main.js' : [ 'app/assets/_js/script.js' ]
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
                  dest: 'wp/wp-content/themes/vtex-theme/images',
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
                  dest: 'wp/wp-content/themes/vtex-theme/images',
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
          'app/*.html',
          'app/*.php'
        ],

        tasks : [ 'uglify', 'sass', 'copy', 'browserSync' ]
      }
    }, // watch

    copy: {
      main: {
      files: [
        {
          cwd: 'app/fonts',  // set working folder / root to copy
          src: '**/*',           // copy all files and subfolders
          dest:'wp/wp-content/themes/vtex-theme/fonts',    // destination folder
          expand: true           // required when using cwd
        },

        { 
          cwd: 'app',
          src: ['apple-touch-icon-precomposed.png', '*.php', '*.css'],
          dest:'wp/wp-content/themes/vtex-theme/',
          expand: true
        },

        { 
          cwd: 'app/assets/_js',
          src:'modernizr.min.js',
          dest:'wp/wp-content/themes/vtex-theme/js',
          expand: true 
        },

        { 
          cwd: 'app/images/',
          src:'*.svg',
          dest:'wp/wp-content/themes/vtex-theme/images',
          expand: true 
        },

        { 
          cwd: 'app',
          src: ['manutencao.html', '.htaccess', '*.txt', 'manifest.webapp'],
          dest:'wp/',
          expand: true 
        },
      ]
    }
  }, // copy

   browserSync: {
        files: {

            // Aplicando o recurso de Live Reload nos seguintes arquivos
            src : [
                'wp/wp-content/themes/vtex-theme/css/*.css',
                'wp/wp-content/themes/vtex-theme/*.html'
            ],

        },
        options: {

            // Atribuíndo um diretório base
            server: {
                // Definindo um IP manualmente
                host : "localhost/",
                baseDir: "wp/wp-content/themes/vtex-theme/"
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


    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.cardansinec.hospedagemdesites.ws', // host do servidor
          // port: 21,
          authKey: 'key1' // key do arquivo de password do plugin
        },
        src: 'wp/', // Pasta de onde serão enviados os arquivos
        dest: 'public_html/app/', // Pasta de destino no servidor Ex.: Httpdocs/Public_html
        // exclusions: ['path/to/source/folder/**/.DS_Store', 'path/to/source/folder/**/Thumbs.db', 'path/to/dist/tmp']
      }
    }, //ftp deploy

  });


  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-sass' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );
  grunt.loadNpmTasks( 'grunt-browser-sync' );
  grunt.loadNpmTasks( 'grunt-ftp-deploy' );
  


  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'sass', 'uglify', 'copy', 'browserSync' ] );

  // Tarefa para Watch
  grunt.registerTask( 'img', [ 'imagemin' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

  // Deploy -  Mandando os arquivos de /dist para o servidor
  grunt.registerTask( 'deploy', [ 'ftp-deploy' ] );

};