module.exports = function(app){

    var listaProdutos = function(req, res, next){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);        
        produtosDAO.lista(function(err, results){
            if(err){
                return next(err);
            }
            res.format({
                html: function(){
                    res.render('produtos/lista',{
                        lista:results
                    });
                },
                json: function(){
                    res.json(results)
                }
            });
        });

        connection.end();        
    }
    
    // index
    app.get('/produtos',listaProdutos);    

    //create
    app.get('/produtos/form',function(req, res){
        res.render('produtos/form', {
            errosValidacao: {},
            produto: {}
        });
    });

    //store
    app.post('/produtos/form', function(req, res){
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.produtosDAO(connection);  

        var produto = req.body;
        req.assert('titulo','O título é obrigatório').notEmpty();
        req.assert('preco','Formato inválido!').isFloat();
        var erros = req.validationErrors();

        if(erros){
            /*res.render('produtos/form', {
                errosValidacao: erros,
                produto: produto
            });*/
            res.format({
                html: function(){
                    res.status(400).render('produtos/form', {
                        errosValidacao: erros,
                        produto: produto
                    });
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });
            return;
        }
        //console.log(produto);

        produtosDAO.salva(produto, function(err, results){
            console.log(err);
            res.redirect('/produtos');
        });
    }); 

    //edit

    //update

    //delete
}


