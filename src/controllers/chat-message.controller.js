const Controller = require("./controller");

class ChatMessageController extends Controller{
    constructor(conn){
        super();
        this.conn = conn;
        if(this.conn == null)
            this.conn = Controller.connect();
    }

    async list(message={}){
        let sql = `
            SELECT * FROM CHAT_MESSAGES WHERE 1=1
        `;
        let params = [];
        if(message?.id != null){
            sql += ' AND id = ? ';
            params.push(message?.id);
        }else{
            if(message?.chat_id != null){
                sql += ' AND chat_id = ? ';
                params.push(message?.chat_id);
            }
            if(message?.sender_id != null){
                sql += ' AND sender_id = ? ';
                params.push(message?.sender_id);
            }
        }
        
        let messages = await Controller.query(this.conn,sql, params);

        messages.forEach(message => {
            message[message?.type] = message?.data;
            delete message.data;
        });

        return messages;
    }

    async get(message={}){
        let messages = await this.list(message);
        message = (Array.isArray(messages) && messages.length)? messages[0] : null;
        return message;
    }

    async create(message){
        let params = [
            message?.legacy_code,
            message?.type,
            message?.data,
            message?.sent_at,
            message?.sender_id,
            message?.chat_id
        ];
        let sql = `
            INSERT INTO CHAT_MESSAGES ( legacy_code, type, data, created_at, sent_at, sender_id, chat_id ) VALUES (?, ?, ?, NOW(), ?, ?, ?)
        `;
        let result = await Controller.query(this.conn,sql,params);

        if(result.affectedRows == 0)
            throw new Error("The chat message couldn't be imported!");

        let id = result?.insertId;
    
        return id;
    }
}

module.exports = ChatMessageController;