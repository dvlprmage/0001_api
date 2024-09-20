const express = require('express')
const router = express.Router()
const Response = require('../models/response');

router.get('/', async (req, res) => {
    
    let response = new Response(null,200);
    response.status = 500;
    response.data = "funcionado!";

    res.status(response.status).json(response);
});

module.exports = router;