module.exports = function( app ) {
    var controller = app.controllers.PessoaController;

    app.route( "/" )
        .get( controller.listarTodasPessoas );
   
    app.route( "/pessoa" )
        .get( controller.cadastrarPessoa )
        .post( controller.salvarPessoa ) ;
    
    app.route( "/editarPessoa" )
        .get( controller.editarPessoa );
    
    app.route( "/excluirPessoa" )
        .get( controller.excluirPessoa );
};