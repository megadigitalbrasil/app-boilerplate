APP Boilerplate
=========

Arquivos base para desenvolvimento de sites e temas para wordpress.

Dependencias
----

- [Ruby](http://www.rubyinstaller.org/)
- [NodeJs](http://nodejs.org/)
- [GruntJs](http://gruntjs.com/)
- [SASS](http://sass-lang.com/)


Como usar
----

Instalar dependencias

    cd app-boilerplate
    npm install

Assistir arquivos (watch)

    grunt w
    
Comprimir imagens

    grunt img

Sicronizar browsers

    grunt serve
      
Deploy
    
    grunt deploy


Observações
----

- Configurar .ftppass para fazer deploy
- Mudar a pasta /dest quando for desenvolver temas para wordpress
- Configurar caminho do projeto no browserSync dentro do gruntfile.js

