// OBM controller logic and functionality

//imports
const express = require('express');
const router = express.Router() 
const RecipeIngredient = require('../models/RecipeIngredient');

//get all recipe ingredients
router.get('/',(req,res)=>{
    RecipeIngredient.findAll({ 
    }).then(r=>{
        let riList = JSON.stringify(r)
        res.setHeader('Content-type','application/json');
        res.send(riList);
        res.status(200);
    })
})

//export
module.exports = router;
