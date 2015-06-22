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
        
        renderPessoa( pessoa, response );
    };
    
    controller.editarPessoa = function( request, response ) {
        var id = request.query.id;
        
        var pessoa = pessoas.filter( function( pessoa ) {
            return pessoa.id == id;   
        })[0];
        
        if( pessoa )
            renderPessoa( pessoa, response );
        else  
            response.render( "index", {
                pessoas : pessoas, 
                mensagem : {
                    tipo : "ERRO",
                    texto : "Não existe pessoa com esse ID"
                }
            });
    };
    
    function renderPessoa( pessoa, response ) {
        response.render( "pessoa", { pessoa : pessoa } );
    }
    
    function redirectToIndex( response ) {
        response.redirect( "/" );
    }
    
    controller.excluirPessoa = function( request, response ) {
        var id = request.query.id;
        
        pessoas = pessoas.filter( function( pessoa ) {
            return pessoa.id != id;   
        });
        
        redirectToIndex( response );
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
        else if( !controller.validarTelefone( dados.telefone ) ) {
            mensagemErro = "Erro na validação do telefone";
        }
        
        if( mensagemErro ) {
            response.render( "pessoa", {
                    pessoa : dados,
                    mensagem : { tipo : "ERRO", texto : mensagemErro }
                }
            );
        } else {
            if( id != -1 ) {
                dados.id = id;
                editarPessoa( dados );
            } else {
                adicionarPessoa( dados );
            }
            
            redirectToIndex( response );
        }
    };
    
    function adicionarPessoa( pessoa ) {
        pessoa.id = idAtual++;
        pessoas.push( pessoa );
    };
    
    function editarPessoa( pessoa ) {
        pessoas = pessoas.map( function( pessoaBuscada ) {
           if( pessoaBuscada.id == pessoa.id ) {
               pessoaBuscada = pessoa;
           }
           
           return pessoaBuscada;
        });
    }
    
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
    
    controller.validarTelefone = function( telefone ) {
        telefone = telefone.replace( "(", "" ).replace( ")", "" )
                           .replace( "-", "" ).replace( ".", "" )
                           .replace( " ", "" );

        if( telefone.length < 10 )
            return false;         
            
        if( !isDDDValido( telefone.substring(0,2) ) )
            return false;
        
        return true;
    };
    
    var isDDDValido = function( dddProcurado ) {
        dddProcurado = parseInt( dddProcurado );
        
        var ddds = [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27,
                     28, 31, 32, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46,
                     47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66,
                     67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84,
                     85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99 ];
        
        return ddds.indexOf( dddProcurado ) > -1;
    }
    
    return controller;
};