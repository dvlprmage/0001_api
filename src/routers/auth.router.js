const express = require('express')
const router = express.Router();
const Response = require('../models/response');
const Controller = require('../controllers/controller');
const AuthController = require('../controllers/auth.controller');

router.post('/login', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let authController = new AuthController(conn);
        let body = req.body;
        let username = body?.username;
        let password = body?.password;

        let user = await authController.login(username, password);
        
        response.data = user;
    }catch(error){
        console.log(error);
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});

  
module.exports = router