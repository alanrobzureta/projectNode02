const express = require('../config/express')();
const request = require('supertest')(express);

describe('#ProdutosController', function(){

    beforeEach(function(done){
        const conn = express.infra.connectionFactory();
        conn.query("truncate produtos", function(err,result){
            if(!err) {
                done();
            }
        });
    });

    it('#listagem json', function(done) {
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
    });

    it('#cadastro de novo produto com dados invalidos', function(done){
        request.post('/produtos/form')
            .send({titulo: "", descricao: "novo livro"})
            .expect(400, done);
    });

    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos/form')
        .send({titulo:"titulo",descricao:"novo livro",preco:20.50})
        .expect(302,done);
    });

    afterEach(function(done){
        const conn = express.infra.connectionFactory();
        conn.query("truncate produtos", function(err,result){
            if(!err) {
                done();
            }
        });
    });


});