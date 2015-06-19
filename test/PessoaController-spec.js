var PessoaController = require("../app/controllers/PessoaController")();

require('jasmine-expect');

describe("PessoaController", function() {
	describe("CadastrarPessoa", function() {
		it("Espero que quando chamar a função cadastrarPessoa, " +
		   "ela me retorne a view 'pessoa' e um objeto pessoa vazio", function() {
			   var request = "";
			   
			   var response = criarEhObterObjectoResponse();

			   PessoaController.cadastrarPessoa( request, response );
				
			   var esperado = criarEhObterObjetoEsperado(
				   "pessoa",
				   { pessoa: { id : -1, nome: '', cpf: '', email: '', telefone: '' } }
				);
			
			   expect( JSON.stringify( response ) ).toEqual( JSON.stringify( esperado ) );
		});
	});
	
	describe("SalvarPessoa", function() {
		it("Espero que quando chamar a função salvarPessoa, " +
		   "ela me retorne a view 'index' e uma array de pessoas com no minimo uma pessoa", function() {
			   var request = {
				   body : {
					   id : -1,
					   nome : "teste",
					   cpf : "28637771653",
					   email : "teste@teste.com",
					   telefone : "99999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );

			   expect(response.view).toBe( "index" );
			   expect(response.object.pessoas).toBeArray();
			   expect(response.object.pessoas.length).toNotEqual( 0 );
		});
		
		it("Espero que quando chamar a função salvarPessoa, " +
		   "ela me retorne um erro de valicao do CPF", function() {
			   var request = {
				   body : {
					   nome : "teste",
					   cpf : "28637771654",
					   email : "teste@teste.com",
					   telefone : "99999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );
			   
			   var esperado = criarEhObterObjetoEsperado(
				   "pessoa",
				   {
					   pessoa : request.body,
					   mensagem : { tipo: 'ERRO', texto: 'Erro na validação do CPF' }
				   }
				);

			   expect( JSON.stringify(response) ).toEqual( JSON.stringify(esperado) );
		});
		
		it("Espero que quando chamar a função salvarPessoa, " +
		   "ela me retorne um erro de valicao do e-mail", function() {
			   var request = {
				   body : {
					   nome : "teste",
					   cpf : "28637771653",
					   email : "teste@teste",
					   telefone : "99999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );
			   
			   var esperado = criarEhObterObjetoEsperado(
				   "pessoa",
				   {
					   pessoa : request.body,
					   mensagem : { tipo: 'ERRO', texto: 'Erro na validação do e-mail' }
					}
				);
				
			   expect( JSON.stringify(response) ).toEqual( JSON.stringify(esperado) );
		});
	});
	
	describe( "ValidarCPF", function() {
		it("Espero true como retorno quando passar um CPF válido", function() {
			var retorno = PessoaController.validarCPF("28637771653");
			
			expect(retorno).toBe( true );
		});
		
		it("Espero false como retorno quando passar um CPF inválido", function() {
			var retorno = PessoaController.validarCPF("28637771655");
			
			expect(retorno).toBe( false );
		});
	});
	
	describe( "ValidarEmail", function() {
		it("Espero true como retorno quando passar um e-mail válido", function() {
			var retorno = PessoaController.validarEmail("teste@teste.com");
			
			expect(retorno).toBe( true );
		});
		
		it("Espero false como retorno quando passar um e-mail inválido", function() {
			var retorno = PessoaController.validarEmail("teste@teste");
			
			expect(retorno).toBe( false );
		});
	});
});

function criarEhObterObjectoResponse() {
	return {
	   view : "",
	   object : {},
	   
	   render : function( view, object ) {
		   this.view = view;
		   this.object = object;
	   }
   };	
};

function criarEhObterObjetoEsperado( view, objectValue ) {
	return {
	   view : view,
	   object : objectValue,				   
	   render : function() {}
   };
};