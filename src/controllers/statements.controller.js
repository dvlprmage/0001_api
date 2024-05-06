const StatementCategory = require("../models/statement-category.model");
const Statement = require("../models/statement.model");
const Controller = require("./controller");

class StatementsController extends Controller{
    constructor(conn){
        super();
        this.conn = conn;
        if(this.conn == null)
            this.conn = Controller.connect();
    }

    async list(){
        let sql = `
            SELECT 
                S.id,
                DATE_FORMAT(S.created_at, "%Y-%m-%d") AS created_at,
                S.amount,
                S.category_id,
                S.description,
                SC.name category_name
            FROM ${Statement.DBNAME} S
            LEFT JOIN ${StatementCategory.DBNAME} SC ON SC.id = S.category_id
        `;
        let rows = await Controller.query(this.conn, sql);

        let statements = rows.map(row => {
            return {
                id: row.id,
                amount: row.amount,
                created_at: row?.created_at,
                description: row.description,
                category: {
                    id: row?.category_id,
                    name: row?.category_name,
                }
            };
        })

        return statements;
    }

    async create(data){
        let sql = `
            INSERT INTO ${Statement.DBNAME} (created_at, amount, category_id, description) VALUES (?, ?, ?, ?)
        `;
        let params = [
            data?.created_at,
            data?.amount,
            data?.category_id,
            data?.description
        ];

        let result = await Controller.query(this.conn,sql,params);
        if(!result)
            throw new Error();
    }

    async delete(id){
        if(id != null){
            let sql = `
                DELETE FROM ${Statement.DBNAME} WHERE id = ?
            `;
            let params = [id];

            let result = await Controller.query(this.conn,sql,params);
            if(!result)
                throw new Error();
        }
    }
}

module.exports = StatementsController;