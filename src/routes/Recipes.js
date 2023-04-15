// Recipes controller logic and functionality

//imports
const express = require('express');
const router = express.Router() 
const { check, validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const User = require('../models/User');


function linkIngredients(recipeData, recipe) {
    //ingredient inventory validation
    const ingredients = recipeData.ingredientList.map(id =>Ingredient.findByPk(id));
    return Promise.all(ingredients).then(ingredientInstances => {
        recipe.setIngredients(ingredientInstances)
    })
}

// get all recipes
router.get('/',(req,res)=>{
    Recipe.findAll().then(recipes=>{
        let rList = JSON.stringify(recipes);
        res.setHeader('Content-type','application/json');
        res.send(rList);
        res.status(200);
    })
})

//get recipe by id
router.get('/id/:recipe_id', (req,res)=>{
    const id = req.params.recipe_id;
    Recipe.findByPk(id).then(recipe => {
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    })
})

//get recipes by name
router.get('/name/:recipe_name', (req,res)=>{
    const recipeName = req.params.recipe_name;
    Recipe.findAll({ where: { recipe_name: recipeName } })
    .then(recipes =>{
        if(!recipes) {
            return res.status(404).json({ error: 'No Recipes found' });
        }
        res.status(200).json(recipes);
    
    })
})

//get recipes by type
router.get('/type/:recipe_type', (req,res)=>{
    const recipeType = req.params.recipe_type;
    Recipe.findAll({ where: { recipe_type: recipeType } })
    .then(recipes =>{
        if(!recipes) {
            return res.status(404).json({ error: 'No Recipes Found' });
        }
        res.status(200).json(recipes);
    })
})

//get recipes by user
router.get('/owner/:owner', (req,res)=>{
    const user = req.params.owner;
    Recipe.findAll({ where: { owner: user} })
        .then(recipes =>{
            if(!recipes) {
                return res.status(404).json({ error: 'No Recipes Found' });
            }
            res.status(200).json(recipes);
        })
})

// post a recipe 
router.post('/', [
    // check validation
    check('recipeName').notEmpty(),
    check('recipeType').notEmpty(),
    check('owner').notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Please fill in all required fields',
            errors: errors.array()
          });
    }
    // creating a new recipe in db
    const recipeData = req.body;

    User.findByPk(recipeData.owner).then(user=>{
        if (user){
            Recipe.create({ 
                recipeName: recipeData.recipeName,
                recipeType: recipeData.recipeType,
                owner: recipeData.owner,
                description: recipeData.description
            }).then(recipe => {
                linkIngredients(recipeData, recipe).then(() => {
                    res.status(201).send("Recipe created successfully");
                }).catch(error => {
                    res.status(500).send(`Error creating recipe: ${error.message}`);
                });   
            })      
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    }).catch(error => {
        res.status(500).send(`Error creating recipe: ${error.message}`);    
    });
});

//update recipe by id
router.put('/id/:recipe_id', (req,res)=>{
    const id = req.params.recipe_id;

    Recipe.findByPk(id).then(recipe =>{

        const recipeData = req.body;

        Recipe.update({
            recipeName: recipeData.recipeName,
            recipeType: recipeData.recipeType,
            ingredientList: recipeData.ingredientList,
            description: recipeData.description,
            owner: recipeData.owner
        },{
            where:{recipe_id:id}
        })
        .then(() => {
            if(!recipe) {
                return res.status(404).json({ error: 'No Recipes Found' });
            } else { 
                if (recipeData.ingredientList && recipeData.ingredientList.length > 0){
                    linkIngredients(recipeData, recipe).then(() => {
                        res.status(201).send("Recipe updated successfully");
                    }).catch(error => {
                        res.status(500).send(`Error updating recipe: ${error.message}`);
                    })
                } else {
                    res.status(201).send("Recipe updated successfully");
                }
            }
        })
        .catch(error =>{
            res.status(500).send(`Error updating recipe: ${error.message}`);
        })
    })
})

    router.delete('/id/:recipe_id',(req,res)=>{
        const id = req.params.recipe_id;
        Recipe.findByPk(id).then((ingredient)=>{
            Recipe.destroy({
                where:{ recipe_id:id }
            })
            if (!ingredient) {
                return res.status (404).json ({ error: 'Recipe not found' });
            }
            res.status(200).send('Recipe deleted successfully');
        })
    })

//export
module.exports = router;