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

//get ingredient by id
router.get('/id/:ingredient_id', (req,res)=>{
    const id = req.params.ingredient_id;
    Ingredient.findByPk(id).then(ingredient => {
        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);    
    })
})

//get ingredients by name
router.get('/name/:ingredient_name', (req,res)=>{
    const ingredientName = req.params.ingredient_name;
    Ingredient.findAll({ where: { ingredient_name: ingredientName } })
    .then(ingredient =>{
        if(!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);
    })
})

//get ingredients by type
router.get('/type/:ingredient_type', (req,res)=>{
    const ingredientType = req.params.ingredient_type;
    Ingredient.findAll({ where: { ingredient_type: ingredientType } })
    .then(ingredient =>{
        if(!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);
    });
});


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

//update recipe by id
router.put('/id/:ingredient_id', (req,res)=>{
    const id = req.params.ingredient_id;

    Ingredient.findByPk(id).then(ingredient =>{
    
            const ingredientData = req.body;
            Ingredient.update({
                ingredientName: ingredientData.ingredientName,
                ingredientType: ingredientData.ingredientType
               },{
                where:{ingredient_id:id}
               })
               if(!ingredient) {
                return res.status(404).json({ error: 'Ingredient not found' });
            }
            res.status(200).send('Ingredient updated successfully');
        })
    })


//export
module.exports = router;
