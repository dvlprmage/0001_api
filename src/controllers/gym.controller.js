const GymSchedule = require("../models/gym-schedule.model");
const Controller = require("./controller");

class GymController extends Controller{
    constructor(conn){
        super();
        this.conn = conn;
        if(this.conn == null)
            this.conn = Controller.connect();
    }

    async schedule(){
        let sql = `
            SELECT DATE_FORMAT(date, "%Y-%m-%d") as date FROM ${GymSchedule.DBNAME}
        `;
        let gymSchedule = await Controller.query(this.conn,sql);

        return gymSchedule;
    }

    async updateSchedule(schedule){

        let sql = `DELETE FROM ${GymSchedule.DBNAME} WHERE ID > 0 `;
        let result = await Controller.query(this.conn,sql);

        if(Array.isArray(schedule) && schedule.length){
            sql = schedule.map(() => '(?)').join(',');
            sql = `INSERT INTO ${GymSchedule.DBNAME} (date) VALUES ${sql}`;
            await Controller.query(this.conn,sql,schedule);
        }

        return result;
    }
}

module.exports = GymController;