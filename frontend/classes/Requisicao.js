
///----------------------------------------------------setor requisicao --------------------------------------------------------










//funcao de requisicao get sem paramentro JSON
async function requisicaoGET(url, authorization){

	var retorno;

	await axios.get('http://localhost:3333/'+url, authorization)
		.then(function(response){
			if(response.status==200){
				retorno=response;
			}else{
				mensagemDeErro(response);
			}
		})
		.catch(function(error){
			mensagemDeErro(error);
		});

	return retorno;
}










//funcao de requisicao get sem paramentro JSON
async function requisicaoDELETE(url,json, authorization){
	
	await axios.delete('http://localhost:3333/'+url+json, authorization)
		.then(function(response){
			if(response.status!=200){
				mensagemDeErro(response);
			}
		})
		.catch(function(error){
			mensagemDeErro(error);
		});
}










//funcao de requisicao post com paramentro JSON
async function requisicaoPOST(url,json,authorization){
	var retorno;

	await axios.post('http://localhost:3333/'+url,json, authorization)
	.then(function(response){
		if(response.status!=200){
			mensagemDeErro(response);
		}else{
			retorno = response;
		}
	})
	.catch(function(error){
		mensagemDeErro(error);
	});

	return retorno;
}










//funcao de requisicao put com paramentro JSON
async function requisicaoPUT(url,json,authorization){
	await axios.put('http://localhost:3333/'+url,json, authorization)
	.then(function(response){
		if(response.status!=200){
			mensagemDeErro(response);
		}
	})
	.catch(function(error){
		mensagemDeErro(error);
	});
}
