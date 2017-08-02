module.exports = function(app){
  app.get('/estoque', function(req, res){
    console.log('Recebida requisicao de teste na porta 3002.')
    res.send('OK.');
  });

  app.post('/estoque/listaProdutosParaVenda', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var EstoqueDao = new app.persistencia.EstoqueDao(connection);

    EstoqueDao.listaProdutosParaVenda(function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        res.status(500).send(erro);
      } else {
        console.log('produtos disponiveis em estoque listados');
        res.status(201).json(resultado);
      }
    });
  });

  app.post('/estoque/listaProdutoEmEstoquePorId', function(req, res){

    var produto = req.body;

    var connection = app.persistencia.connectionFactory();
    var EstoqueDao = new app.persistencia.EstoqueDao(connection);

    EstoqueDao.listaProdutoEmEstoquePorId(produto.id, function(erro, resultado){
      if(erro){
        console.log('Erro ao consultar no banco:' + erro);
        res.status(500).send(erro);
      } else {
        console.log('produto listado');
        res.status(201).json(resultado);
      }
    });
  });
}
