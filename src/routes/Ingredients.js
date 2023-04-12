// Ingredients controller logic and functionality

//// needs more validation... but so does everything

// imports
const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

//get all ingredients
router.get('/',(req,res)=>{
    Ingredient.findAll().then(ingredients=>{
        let iList = JSON.stringify(ingredients);
        res.setHeader('Content-type','application/json');
        res.send(iList);
        res.status(200);
    })
})

//post new ingredient
router.post('/',(req,res)=>{

    const recipeData = req.body;
    Ingredient.create({ 
        ingredientName: recipeData.ingredientName,
        ingredientType: recipeData.ingredientType,
        ingredientList: recipeData.ingredientList,   
    }).then(ingredient => {
        if (recipeData.recipes && recipeData.recipes.length > 0) {
            ingredient.setRecipes(recipeData.recipes).then(() => {
                res.status(201).send("Ingredient created successfully");
            });
        } else {
            res.status(201).send("Ingredient created successfully");
        }
    }).catch(error => {
        res.status(500).send(`Error creating ingredient: ${error.message}`);
    });

})


//export
module.exports = router;
