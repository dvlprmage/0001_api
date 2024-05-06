const express = require('express')
const router = express.Router()
const Response = require('../models/response');
const StatementCategoriesController = require('../controllers/statement-categories.controller');
const Controller = require('../controllers/controller');

router.get('/', async (req, res) => {
    const conn = Controller.connect();
    let response = new Response(null,200);
    try{
        let statementCategoriesController = new StatementCategoriesController(conn);
        let statementCategories = await statementCategoriesController.list();
        response.data = statementCategories;
    }catch(error){
        response.status = 500;
    }finally{
        Controller.finishConnection(conn);
    }

    res.status(response.status).json(response);
})
  
module.exports = router