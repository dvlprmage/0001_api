class Statement{

    static DBNAME = "STATEMENTS";

    constructor(
        id=null,
        amount=null,
        created_at=null,
        category_id=null,
        legacy_code=null,
        description=null
    ){
        this.id = id;
        this.amount = amount;
        this.created_at = created_at;
        this.category_id = category_id;
        this.legacy_code = legacy_code;
        this.description = description;
    }
}

module.exports = Statement;