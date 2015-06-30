var config = require( "../../config/config" );

describe( "CadastroDePessoa", function() {
	it( "Espero dar conta de cadastrar uma nova pessoa", function() {
		var driver = browser.driver;
		
		driver.get('http://localhost:' + config.port );
		
		driver.findElement( by.id( "novaPessoa" ) ).click();
		
		driver.findElement( by.name( "nome" ) ).sendKeys("teste");
		driver.findElement( by.name( "cpf" ) ).sendKeys("11843713349");
		driver.findElement( by.name( "email" ) ).sendKeys("teste@teste.com");
		driver.findElement( by.name( "telefone" ) ).sendKeys("1299999999");
		driver.findElement( by.id( "salvar" ) ).click();
		
		
		driver.findElements(by.xpath('//*[@id="tablePessoas"]/tbody/tr')).then(function( rows ) {
			rows[0].findElements( by.tagName("td") ).then(function( row ) {
				row[0].getText().then( function( text ){
					expect( text ).toBe( "teste" );
				});
				
				row[1].getText().then( function( text ){
					expect( text ).toBe( "11843713349" );
				});
				
				row[2].getText().then( function( text ){
					expect( text ).toBe( "teste@teste.com" );
				});
				
				row[3].getText().then( function( text ){
					expect( text ).toBe( "1299999999" );
				});
			});
		});
		
	});
});