var PessoaController = require("../app/controllers/PessoaController")();

require('jasmine-expect');

describe("PessoaController", function() {
	describe( "ListarTodasPessoas", function() {
		it( "Espero receber como retorno a view 'index' e uma lista de pessoas", function() {
			var response = criarEhObterObjectoResponse();
			var request = {};
			
			PessoaController.listarTodasPessoas( request, response );
			
			expect( response.view ).toBe( "index" );
			expect( response.object.pessoas ).toBeArray();
		});	
	})
	
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
					   telefone : "1199999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );

			   expect(response.view).toBe( "/" );
		});
		
		it("Espero que quando chamar a função salvarPessoa, e existir o ID passado, " +
		   "seja retornado a view 'index' e uma array de pessoas com no minimo uma pessoa", function() {
			   var request = {
				   body : {
					   id : 0,
					   nome : "teste",
					   cpf : "28637771653",
					   email : "teste@teste.com",
					   telefone : "1199999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );

			   expect(response.view).toBe( "/" );
		});
		
		it("Espero que quando chamar a função salvarPessoa, " +
		   "ela me retorne um erro de valicao do CPF", function() {
			   var request = {
				   body : {
					   nome : "teste",
					   cpf : "28637771654",
					   email : "teste@teste.com",
					   telefone : "1199999999"
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
					   telefone : "1199999999"
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
		
		it("Espero que quando chamar a função salvarPessoa, " +
		   "ela me retorne um erro de valicao do telefone", function() {
			   var request = {
				   body : {
					   nome : "teste",
					   cpf : "28637771653",
					   email : "teste@teste.com",
					   telefone : "0199999999"
				   }
			   };
			   
			   var response = criarEhObterObjectoResponse();
			   
			   PessoaController.salvarPessoa( request, response );
			   
			   var esperado = criarEhObterObjetoEsperado(
				   "pessoa",
				   {
					   pessoa : request.body,
					   mensagem : { tipo: 'ERRO', texto: 'Erro na validação do telefone' }
					}
				);
				
			   expect( JSON.stringify(response) ).toEqual( JSON.stringify(esperado) );
		});
	});
	
	describe( "EditarPessoas", function() {
		it( "Espero passar um ID de uma pessoa que não está cadastrada e ele me retornar um erro", function() {
			var request = { query : { id : -1 } };
			var response = criarEhObterObjectoResponse();
			
			PessoaController.editarPessoa( request, response );
			
			expect( response.view ).toBe( "index" );
			expect( response.object.pessoas ).toBeArray();
			expect( response.object.mensagem.texto ).toBe( "Não existe pessoa com esse ID" );
		});
		
		it( "Espero passar um ID de uma pessoa que está cadastrada e ele me retornar o objeto editado", function() {
			var request = { query : { id : 0 } };
			var response = criarEhObterObjectoResponse();
			
			PessoaController.editarPessoa( request, response );
		
			expect( response.view ).toBe( "pessoa" );
			expect( response.object.pessoa ).toBeObject();
		});
	});
	
	describe( "ExcluirPessoa", function() {
		it( "", function() {
			var request = { query : { id : -1 } };
			var response = criarEhObterObjectoResponse();
			
			PessoaController.excluirPessoa( request, response );
			
			expect( response.view ).toBe("/");
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
	
	describe( "ValidarTelefone", function() {
		it("Espero true como retorno quando passar um telefone com DDD válido e acima de 10 digitos", function() {
			var retorno = PessoaController.validarTelefone("1199999999");
			
			expect(retorno).toBe( true );
		});
		
		it("Espero true como retorno quando passar um telefone com DDD inválido e abaixo de 10 digitos", function() {
			var retorno = PessoaController.validarTelefone("009999999");
			
			expect(retorno).toBe( false );
		});
		
		it("Espero false como retorno quando passar um telefone inválido", function() {
			var retorno = PessoaController.validarEmail("0199999999");
			
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
	   },
	   
	   redirect : function( view ) {
		   this.view = view;
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