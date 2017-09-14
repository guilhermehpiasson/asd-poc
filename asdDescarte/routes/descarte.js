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

    var produto = req.body;

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
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.registraErroExecucao(erro ,function(erro, resultado){
      if(erro){
        console.log('Erro ao registrar no banco:' + erro);
        res.status(500).send(erro);
      } else {

        res.status(201).json(resultado);
      }
    });
  });

  /*function teste(){
    for (var i = 0; i < resultado.length; i++) {
      console.log(resultado[i].COMPRA_PRODUTO_ID);
      console.log(resultado[i].DATA_COMPRA);
      console.log(resultado[i].QNT_DISPONIVEL);
    }
  };*/
}
