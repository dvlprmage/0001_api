const User = require("../models/token.model");
const Token = require("../models/user.model");
const Controller = require("./controller");

const {v4: uuid} = require('uuid');

class AuthController extends Controller{
    constructor(conn){
        super();
        this.conn = conn;
        if(this.conn == null)
            this.conn = Controller.connect();
    }

    async login(username, password){
        let user = null;
        let token = null;
        let params = [];
        let validity = 6;
        params.push(username);
        params.push(password);
        let sql = `
            SELECT id, name, email FROM ${User.DBNAME} WHERE email = ? AND password = ?
        `;
        let rows = await Controller.query(this.conn, sql, params);
        if(rows?.length)
            user = rows[0];

        if(user?.id != null){
            let sql = `
                SELECT code FROM ${Token.DBNAME} T INNER JOIN ${User.DBNAME} U ON U.ID = T.user_id WHERE U.id = ?
            `;
            let params = [];
            params.push(user?.id);

            rows = await Controller.query(this.conn, sql, params);
            if(rows?.length)
                token = rows[0]["code"];

            if(token == null){
                token = uuid();
                params.push(token);
                sql = `INSERT INTO ${Token.DBNAME} (user_id, code, created_at, expire_at) VALUES ( ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL ${validity} HOUR))`;
                await Controller.query(this.conn,sql,params);
            }
            user.token = token;
            delete user.id;
        }

        return user;
    }
}

module.exports = AuthController;