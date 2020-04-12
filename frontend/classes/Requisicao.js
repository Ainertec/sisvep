//funcao de requisicao get sem paramentro JSON
async function requisicaoGET(url){

	var retorno;
	
	await axios.get('http://localhost:3333/'+url)
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
async function requisicaoDELETE(url,json){
	var requisicao;

	if(json==null){
		requisicao = await axios.delete('http://localhost:3333/'+url)
	}else{
		requisicao = await axios.delete('http://localhost:3333/'+url+json)
	}
	requisicao.then(function(response){
		if(response.status!=200){
			mensagemDeErro(response);
		}
	})
	.catch(function(error){
		mensagemDeErro(error);
	});
}


//funcao de requisicao post com paramentro JSON
async function requisicaoPOST(url,json){
	await axios.post('http://localhost:3333/'+url,json)
	.then(function(response){
		if(response.status!=200){
			mensagemDeErro(response);
		}
	})
	.catch(function(error){
		mensagemDeErro(error);
	});
}


//funcao de requisicao put com paramentro JSON
async function requisicaoPUT(url,json){
	await axios.put('http://localhost:3333/'+url,json)
	.then(function(response){
		if(response.status!=200){
			mensagemDeErro(response);
		}
	})
	.catch(function(error){
		mensagemDeErro(error);
	});
}
