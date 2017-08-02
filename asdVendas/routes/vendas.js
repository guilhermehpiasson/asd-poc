module.exports = function(app){
  app.get('/vendas', function(req, res){
    console.log('Recebida requisicao de teste na porta 3001.')
    res.send('OK.');
  });

  app.post('/vendas/listaVendas', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var vendaDao = new app.persistencia.VendaDao(connection);

    vendaDao.lista(function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        res.status(500).send(erro);
      } else {
        console.log('vendas listadas');
        res.status(201).json(resultado);
      }
    });
  });

  app.post('/vendas/listaVendaPorId', function(req, res){

    var venda = req.body;
    //res.status(201).json(venda);

    var connection = app.persistencia.connectionFactory();
    var vendaDao = new app.persistencia.VendaDao(connection);

    vendaDao.buscaPorId(venda.id, function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        res.status(500).send(erro);
      } else {
        console.log('vendas listadas');
        res.status(201).json(resultado);
      }
    });
  });
}
