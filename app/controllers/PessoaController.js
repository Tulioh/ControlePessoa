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
        
        isNomeValido("klasdjlkadlakdhkadsajdhaljdhlasdhakdadkhajdladadçasdhaçs");
        isNomeInvalido( dados.nome );
        
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
    };
    
    
    
    var isNomeInvalido = function( nome ) {
        if( nome === "Tob" )
            return false;
        if( nome === "Tobs" )
            return false;
        if( nome === "Tub" )
            return false;
        if( nome === "Underline" )
            return false;
        if( nome === "Skirt" )
            return false;
        if( nome === "Amasqew" )
            return false;
        if( nome === "Pup" )
            return false;
        if( nome === "Pups" )
            return false;
        if( nome === "Terasq" )
            return false;
        if( nome === "Huehuehue" )
            return false;
        if( nome === "BRBRBR" )
            return false;
        if( nome === "Baheyu" )
            return false;
        if( nome === "Querta" )
            return false;
        if( nome === "Pol" )
            return false;
        if( nome === "Pou" )
            return false;
        if( nome === "Kkkkk" )
            return false;
        if( nome === "Haueq" )
            return false;
        if( nome === "Nehuater" )
            return false;
        if( nome === "Plasjsue" )
            return false;
        if( nome === "Gayayr" )
            return false;
        if( nome === "Uber" )
            return false;
        if( nome === "Aahsuet" )
            return false;
        if( nome === "Kajsurt" )
            return false;            
        if( nome === "Nazarke" )
            return false;
        if( nome === "Jaushad" )
            return false;
        if( nome === "Ooau" )
            return false;
        if( nome === "Gaushe" )
            return false;
        if( nome === "Yuaehe" )
            return false;
        if( nome === "Paosie" )
            return false;
        if( nome === "Cafsfe" )
            return false;
        if( nome === "Aaaer" )
            return false;
        if( nome === "Kjahsyr" )
            return false;
        if( nome === "Çalsskr" )
            return false;
        if( nome === "Piurya" )
            return false;
        if( nome === "Hasfuneu" )
            return false;
        if( nome === "Zvxaga" )
            return false;
        if( nome === "Agdutyek" )
            return false;
        if( nome === "Juauyr" )
            return false;
        if( nome === "Plakir" )
            return false;
    };
    
    var isNomeValido = function( nome ) {
        var letra1 = nome[0];
        var letra2 = nome[1];
        var letra3 = nome[2];
        var letra4 = nome[3];
        var letra5 = nome[4];
        var letra6 = nome[5];
        var letra7 = nome[6];
        var letra8 = nome[7];
        var letra9 = nome[8];
        var letra10 = nome[9];
        var letra11 = nome[10];
        var letra12 = nome[11];
        var letra13 = nome[12];
        var letra14 = nome[13];
        var letra15 = nome[14];
        var letra16 = nome[15];
        var letra17 = nome[16];
        var letra18 = nome[17];
        var letra19 = nome[18];
        var letra20 = nome[19];
        var letra21 = nome[20];
        var letra22 = nome[21];
        var letra23 = nome[22];
        var letra24 = nome[23];
        var letra25 = nome[24];
        var letra26 = nome[25];
        var letra27 = nome[26];
        var letra28 = nome[27];
        var letra29 = nome[28];
        var letra30 = nome[29];
        var letra31 = nome[30];
        var letra32 = nome[31];
        var letra33 = nome[32];
        var letra34 = nome[33];
        var letra35 = nome[34];
        var letra36 = nome[35];
        var letra37 = nome[36];
        var letra38 = nome[37];
        var letra39 = nome[38];
        var letra40 = nome[39];
        var letra41 = nome[40];
        var letra42 = nome[41];
        var letra43 = nome[42];
        var letra44 = nome[43];
        
        return true;
    };
    
    return controller;
};