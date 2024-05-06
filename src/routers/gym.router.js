const express = require('express')
const router = express.Router()
const Response = require('../models/response');
const GymController = require('../controllers/gym.controller');
const Controller = require('../controllers/controller');

router.get('/schedule', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let gymController = new GymController(conn);
        let schedule = await gymController.schedule();
        response.data = schedule;
    }catch(error){
        console.log(error);
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});

router.put('/schedule', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let gymController = new GymController(conn);
        let body = req.body;
        let schedule = body?.schedule;
        await gymController.updateSchedule(schedule);
    }catch(error){
        console.log(error);
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});


  
module.exports = router