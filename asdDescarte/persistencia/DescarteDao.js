function DescarteDao(connection) {
    this._connection = connection;
}

DescarteDao.prototype.listaExecucoes = function(callback) {
    this._connection.query('SELECT * FROM EXECUCOES',callback);
}

DescarteDao.prototype.insereRegistroExecucao = function (dataAtual, callback) {
    this._connection.query('INSERT INTO EXECUCOES (`EXECUCAO_DATA`) VALUES (?) ', [dataAtual], callback);
    /*INSERT INTO `liveb01`.`EXECUCOES` (`EXECUCAO_DATA`) VALUES ('2017-09-14 15:29:03.838');*/
}

DescarteDao.prototype.registraErroExecucao = function (callback) {
    this._connection.query('', callback);
}

module.exports = function(){
    return DescarteDao;
};
