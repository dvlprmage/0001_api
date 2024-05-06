const express = require('express')
const router = express.Router()
const Response = require('../models/response');
const Controller = require('../controllers/controller');
const ChatMessageController = require('../controllers/chat-message.controller');
const MqttController = require('../controllers/mqtt.controller');

router.get('/:chat_id/message', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);

    try{
        let chatMessageController = new ChatMessageController(conn);

        let chat_id = req?.params?.chat_id;
        message = await chatMessageController.list({chat_id: chat_id});

        response.data = message;
    }catch(error){
        console.log(error);
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});

router.post('/:channel/message', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);

    try{
        let chatMessageController = new ChatMessageController(conn);
        let mqttController = new MqttController();
        
        let body = req.body;
        let message = body?.message||{};
        let channel = req?.params?.channel;

        message.id =  await chatMessageController.create(message);
        message = await chatMessageController.get({id:message?.id});

        await mqttController.publish(channel, JSON.stringify(message));

        response.data = message;
    }catch(error){
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
});


  
module.exports = router