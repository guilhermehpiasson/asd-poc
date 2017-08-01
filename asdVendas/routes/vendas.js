module.exports = function(app){
  app.get('/vendas', function(req, res){
    console.log('Recebida requisicao de teste na porta 3001.')
    res.send('OK.');
  });
}