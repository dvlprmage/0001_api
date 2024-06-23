class User{

    static DBNAME = "USERS";

    constructor(
        id=null,
        name=null,
        email=null,
        password=null,
        user_id=null
    ){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.user_id = user_id;
    }
}

module.exports = User;