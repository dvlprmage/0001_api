const express = require('express')
const router = express.Router()
const Response = require('../models/response');
const StatementsController = require('../controllers/statements.controller');
const Controller = require('../controllers/controller');

router.get('/', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let statementsController = new StatementsController(conn);
        let statements = await statementsController.list();
        response.data = statements;
    }catch(error){
        console.log(error);
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});

router.post('/', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let statementsController = new StatementsController(conn);
        let data = req.body;
        await statementsController.create(data);
    }catch(error){
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});

router.delete('/:id', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let statementsController = new StatementsController(conn);
        let id = req?.params?.id;
        await statementsController.delete(id);
    }catch(error){
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});


  
module.exports = router