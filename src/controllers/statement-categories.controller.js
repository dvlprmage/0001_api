const StatementCategory = require("../models/statement-category.model");
const Controller = require("./controller");

class StatementCategoriesController extends Controller{
    constructor(conn){
        super();
        this.conn = conn;
        if(this.conn == null)
            this.conn = Controller.connect();
    }

    async list(){
        let sql = `
            SELECT 
                id,
                name
            FROM ${StatementCategory.DBNAME}
        `;
        let statementCategories = await Controller.query(this.conn,sql);

        return statementCategories;
    }
}

module.exports = StatementCategoriesController;