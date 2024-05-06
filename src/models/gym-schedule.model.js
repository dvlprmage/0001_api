class StatementCategory{

    static DBNAME = "GYM_SCHEDULE";

    constructor(
        id=null,
        date=null
    ){
        this.id = id;
        this.date = date;
    }
}

module.exports = StatementCategory;