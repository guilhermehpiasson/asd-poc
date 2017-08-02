function EstoqueDao(connection) {
    this._connection = connection;
}

EstoqueDao.prototype.listaProdutosParaVenda = function(callback) {
    this._connection.query( 'SELECT P.PRODUTO_ID, P.PRODUTO_NOME, '+
                            'CP.COMPRA_PRODUTO_ID,  '+
                            'CP.COMPRA_PRODUTO_QUANTIDADE - SUM(VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE) AS QNT_DISPONIVEL, '+
                            'SUM(VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE) AS QNT_VENDIDO  '+
                            'FROM  '+
                            'PRODUTOS AS P,  '+
                            'COMPRAS_PRODUTOS AS CP,  '+
                            'VENDAS_COMPRAS_PRODUTOS VCP '+
                            'WHERE '+
                            '			P.PRODUTO_ID = CP.PRODUTO_ID '+
                            'AND	CP.COMPRA_PRODUTO_DTVALIDADE  > CURDATE() '+
                            'AND	VCP.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID '+
                            'AND	CP.COMPRA_PRODUTO_QUANTIDADE > VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE '+
                            'GROUP BY CP.PRODUTO_ID; ',callback);
}

EstoqueDao.prototype.listaProdutoEmEstoquePorId = function (id,callback) {
    this._connection.query( 'SELECT P.PRODUTO_NOME, '+
                            'CP.COMPRA_PRODUTO_ID , '+
                            'CP.COMPRA_PRODUTO_QUANTIDADE - SUM(VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE) AS QNT_DISPONIVEL, '+
                            'SUM(VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE) AS QNT_VENDIDO '+
                            'FROM '+
                            'PRODUTOS AS P, '+
                            'COMPRAS_PRODUTOS AS CP, '+
                            'VENDAS_COMPRAS_PRODUTOS VCP '+
                            'WHERE '+
                            '			P.PRODUTO_ID = CP.PRODUTO_ID '+
                            'AND	CP.COMPRA_PRODUTO_DTVALIDADE  > CURDATE() '+
                            'AND	VCP.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID '+
                            'AND	CP.COMPRA_PRODUTO_QUANTIDADE > VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE '+
                            'AND	P.PRODUTO_ID=? '+
                            'GROUP BY CP.PRODUTO_ID;',[id],callback);
}

module.exports = function(){
    return EstoqueDao;
};
