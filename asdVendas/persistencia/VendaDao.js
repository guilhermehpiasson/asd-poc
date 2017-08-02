function VendaDao(connection) {
    this._connection = connection;
}

VendaDao.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM VENDAS ',callback);
}

VendaDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("SELECT * FROM VENDAS where VENDA_ID = ?",[id],callback);
}

module.exports = function(){
    return VendaDao;
};
