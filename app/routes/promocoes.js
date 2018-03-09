module.exports = function(app){
    app.get('/promocoes', function(req, res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);
        produtosDAO.lista(function(err, results){
            res.render('promocoes/form',{
                lista:results
            });
        });
        connection.end();
    });

    app.post('/promocoes',function(req, res){
        var promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes');
    });
}