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

EstoqueDao.prototype.listaProdutosParaDescarte = function (callback) {
    this._connection.query( 'SELECT CP.COMPRA_ID                    AS COMPRA_PRODUTO_ID,  '+
                                    'C.COMPRA_DTCOMPRA              AS DATA_COMPRA,  '+
                                    'CP.COMPRA_PRODUTO_LOTE			    AS LOTE,  '+
                                    'P.PRODUTO_ID										AS PRODUTO_ID,  '+
                                    'P.PRODUTO_NOME                 AS PRODUTO_NOME,  '+
                                    'C.FORNECEDOR_ID								AS FORNECEDOR_ID, '+
                                    'CP.COMPRA_PRODUTO_QUANTIDADE - (SELECT COALESCE(SUM(VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE), 0)  '+
                                                                      'FROM COMPRAS_PRODUTOS CPS,  '+
                                                                      '      VENDAS_COMPRAS_PRODUTOS VCP  '+
                                                                      'WHERE VCP.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID '+
                                                                      'AND CPS.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID) AS QNT_DISPONIVEL '+

                              'FROM  '+
                                    'PRODUTOS AS P,  '+
                                    'COMPRAS_PRODUTOS AS CP,  '+
                                    'VENDAS_COMPRAS_PRODUTOS VCP,  '+
                                    'COMPRAS C  '+
                              'WHERE  '+
                                    'P.PRODUTO_ID = CP.PRODUTO_ID  '+
                                    'AND C.COMPRA_ID = CP.COMPRA_ID  '+
                                    'AND CP.COMPRA_PRODUTO_DTVALIDADE  <= CURDATE()  '+
                                    'AND (	VCP.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID AND CP.COMPRA_PRODUTO_QUANTIDADE > VCP.VENDA_COMPRA_PRODUTO_QUANTIDADE  '+
                                            'OR 0 = (SELECT COUNT(*) FROM VENDAS_COMPRAS_PRODUTOS VCP WHERE VCP.COMPRA_PRODUTO_ID = CP.COMPRA_PRODUTO_ID) '+
                                    '    ) '+
                              'GROUP BY CP.COMPRA_ID', callback);
}

module.exports = function(){
    return EstoqueDao;
};
