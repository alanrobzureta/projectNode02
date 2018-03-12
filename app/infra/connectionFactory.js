var mysql = require('mysql');

function createDBConnection(){
    if(!process.env.NODE_ENV) {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs'
        });
    }

    if(process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'casadocodigo_nodejs_test'
        });
    }

    // if(process.env.NODE_ENV == 'production') {
    //     return mysql.createConnection({
    //         host : 'us-cdbr-iron-east-05.cleardb.net',
    //         user : 'b8fe8b9c15a6b2',
    //         password : 'cb274d69',
    //         database : 'heroku_707cc8bf0bc6e09'
    //     });
    // }
    
    if (process.env.NODE_ENV == 'production') {
        var url = process.env.CLEARDB_DATABASE_URL;
        var grupos = url.match(/mysql:\/\/(.*):(.*)@(.*)\/(.*)\?/);
        return mysql.createConnection({
            host:grupos[3],
            user:grupos[1],
            password:grupos[2],
            database:grupos[4]
        });
    }
}       

module.exports = function(){
    return createDBConnection;
}