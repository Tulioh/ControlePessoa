module.exports = function( app ) {
    var controller = {};
    var pessoas = [];
    var idAtual = 0;
    
    controller.listarTodasPessoas = function( request, response ) { 
        response.render( "index", { pessoas : pessoas } );
    };
    
    controller.cadastrarPessoa = function( request, response ) {
        var pessoa = {
            id : -1,
            nome : "",
            cpf : "",
            email : "",
            telefone : ""
        };
        
        response.render( "pessoa", { pessoa : pessoa } );  
    };
    
    controller.editarPessoa = function( request, response ) {
        var id = request.body.id;
                
        response.render( "pessoa", { pessoa : pessoas[id] } );
    };
    
    controller.excluirPessoa = function( request, response ) {
        var id = request.query;
        console.log("request params: ", request.params)
        pessoas.filter( function( pessoa ) {
            return pessoa.id != id;   
        });
        
        controller.listarTodasPessoas( request, response );
    };
    
    controller.salvarPessoa = function( request, response ) { 
        var id = request.body.id;
        
        var dados = {
            "nome" : request.body.nome,
            "cpf" : request.body.cpf,
            "email" : request.body.email,
            "telefone" : request.body.telefone || null
        };
        
        var mensagemErro;
        
        if( !controller.validarCPF( dados.cpf ) ) {
            mensagemErro = "Erro na validação do CPF";
        }
        else if( !controller.validarEmail( dados.email ) ) {
            mensagemErro = "Erro na validação do e-mail";
        }
        
        if( mensagemErro ) {
            response.render( "pessoa", {
                    pessoa : dados,
                    mensagem : { tipo : "ERRO", texto : mensagemErro }
                }
            );
        } else {
            if( id != -1 ) {
                pessoas[id] = dados;
            } else {
                dados.id = idAtual++;
                pessoas.push( dados );
            }
            
            controller.listarTodasPessoas( request, response );
        }
    };
    
    controller.validarCPF = function( cpf ) {
        var Soma;
        var Resto;
        Soma = 0;
        if (cpf == "00000000000") return false;
        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) return false;
        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) return false;
        return true;
    };
    
    controller.validarEmail = function( email ) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email); 
    };
    
    return controller;
};