class Statement{

    static DBNAME = "STATEMENTS";

    constructor(
        id=null,
        amount=null,
        created_at=null,
        category_id=null,
        description=null
    ){
        this.id = id;
        this.amount = amount;
        this.created_at = created_at;
        this.category_id = category_id;
        this.description = description;
    }
}

module.exports = Statement;