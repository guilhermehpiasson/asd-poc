var cron = require('node-schedule');
var date = require('date-and-time');

module.exports = function(app){

	var rule = new cron.RecurrenceRule();
  //0 1 * * *
  cron.scheduleJob('*/2 * * * *', function(){
      console.log("NOVA DATA 1", date.format(new Date(), 'DD/MM/YYYY HH:mm:ss'));
      disparoDeExecucao();
  });

  function disparoDeExecucao(){

      var connection = app.persistencia.connectionFactory();
      var DescarteDao = new app.persistencia.DescarteDao(connection);

      DescarteDao.insereRegistroExecucao(new Date(), function(erro, resultado){
        if(erro){
          console.log('Erro ao inserir no banco:' + erro);
          // res.status(500).send(erro);
        } else {
          consultaDeProdutosParaDescarte(resultado.insertId);
        }
      });
  };

  function consultaDeProdutosParaDescarte(idExecucao){

    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    var clienteProdutos = new app.servicos.clienteProdutosParaDescarte();

    clienteProdutos.consulta(function(exception, request, response, retorno){
          if(exception){
            console.log(exception);
            // res.status(400).send(exception);
            return;
          }

          if (retorno.length >= 1) {
            populaJsonComProdutos(idExecucao, retorno);
          }
    });

  };

  function populaJsonComProdutos(idExecucao,retorno){
      var notificacao = new Object();

      notificacao.EXECUCOES_ID = idExecucao;
      for (var i = 0; i < retorno.length; i++) {
        notificacao.NOTIFICACAO_JSON_VALORES = retorno[i];
      }
      notificacao.NOTIFICACAO_POSTADA = "F";

      insereNotificacao(notificacao);
  }


  function insereNotificacao(notificacao){
    var connection = app.persistencia.connectionFactory();
    var DescarteDao = new app.persistencia.DescarteDao(connection);

    DescarteDao.insereRegistroNotificacoes(notificacao, function(erro, resultado){
      if(erro){
        console.log('Erro ao inserir no banco:' + erro);
        // res.status(500).send(erro);
      } else {
        // postaMensagemNaFila();
      }
    });
  }

  function postaMensagemNaFila(){
    //posta a msg na fila do respectivo fornecedor
  }
}

//http://www.codexpedia.com/javascript/nodejs-cron-schedule-examples/



// aqui eh o certo
  //rule.second = 10;
  // cron.scheduleJob(rule, function(){


  //0 */3 * * *
  //Cron a cada 5 minutos: 0-59/5  * * * *
  //Cron todo dia a meia noite: 0 0 * * *
  //Cron todo minuto: * * * * *
