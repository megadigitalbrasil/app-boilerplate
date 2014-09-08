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
      
Deploy
    
    grunt deploy


Observações
----

- Retirar prefixo do gruntfile.js desejado.
- Configurar .ftppass para fazer deploy
- Configurar gruntfile.js para wordpress com o caminho do tema desenvolvido.

