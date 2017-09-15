module.exports = function(app){
  app.get('/descarte', function(req, res){
    console.log('Recebida requisicao de teste na porta 3001.')
    res.send('OK.');
  });

  app.post('/descarte/listaExecucoes', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.listaExecucoes(function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        //insere registro de erro de execucao
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });
  });

  app.post('/descarte/insereRegistroExecucao', function(req, res){

    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.insereRegistroExecucao(new Date, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
      }
    });

  });

  app.post('/descarte/registraErroExecucao', function(req, res){

    res.status(201).json(teste());

  });

  function teste(){

    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    var clienteProdutos = new app.servicos.clienteProdutosParaDescarte();

    clienteProdutos.consulta(function(exception, request, response, retorno){
          if(exception){
            console.log(exception);
            res.status(400).send(exception);
            return;
          }

          //console.log(retorno);

          for (var i = 0; i < retorno.length; i++) {
            console.log(retorno[i].COMPRA_PRODUTO_ID);
            console.log(retorno[i].DATA_COMPRA);
            console.log(retorno[i].QNT_DISPONIVEL);
          }

          res.status(201).json(retorno);
          return retorno;
    });
  };
}
