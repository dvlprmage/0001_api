class Token{

    static DBNAME = "TOKENS";

    constructor(
        id=null,
        code=null,
        created_at=null,
        expire_at=null,
        user_id=null
    ){
        this.id = id;
        this.code = code;
        this.created_at = created_at;
        this.expire_at = expire_at;
        this.user_id = user_id;
    }
}

module.exports = Token;