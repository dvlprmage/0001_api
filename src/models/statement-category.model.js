class StatementCategory{

    static DBNAME = "STATEMENT_CATEGORIES";

    constructor(
        id=null,
        name=null
    ){
        this.id = id;
        this.name = name;
    }
}

module.exports = StatementCategory;