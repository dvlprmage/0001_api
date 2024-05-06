class Response{
    constructor(data=null, status=null, message=null){
        this.data = data;
        this.status = status;
        this.message = message;
    }
}

module.exports = Response;