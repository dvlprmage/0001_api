var mysql = require('mysql');

class Controller{
    static connect(){
        var connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PSWD,
            database : process.env.DB_NAME
        });
           
        connection.connect();
        return connection;
    }

    static query(conn,sql, params=[]){
        return new Promise((resolve, reject) => {
            conn.query(sql, params, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    static finishConnection(conn){
        conn.end((err) => {
            if(err) conn.destroy();
        });
    }
}

module.exports = Controller;