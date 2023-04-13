// Recipes controller logic and functionality

//imports
const express = require('express');
const router = express.Router() 
const { check, validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

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

// GET /recipes
router.get('/', (req, res) => {
    const { name, type, user } = req.query;
    const where = {};
    if (name) where.recipe_name = name;
    if (type) where.recipe_type = type;
    if (user) where.user_id = user;
    Recipe.findAll({ where })
      .then(recipes => {
        if (recipes.length === 0) {
          return res.status(404).json({ error: 'No recipes found' });
        }
        res.status(200).json(recipes);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

  
// post a recipe 
router.post('/', [
    // check validation
    check('recipeName').notEmpty(),
    check('recipeType').notEmpty(),
    check('ingredientList').notEmpty()
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
    Recipe.create({ 
        recipeName: recipeData.recipeName,
        recipeType: recipeData.recipeType,
        ingredientList: recipeData.ingredientList,
        user_id: recipeData.userId
    }).then(recipe => {
        
        //ingredient inventory validation
        const ingredients = recipeData.ingredientList.map(id =>Ingredient.findByPk(id));
        Promise.all(ingredients).then(ingredientInstances => {
            recipe.setIngredients(ingredientInstances).then(() => {
                res.status(201).send("Recipe created successfully");
            }).catch(error => {
                res.status(500).send(`Error creating recipe: ${error.message}`);
            });         
        });
            res.status(201).send("Recipe created successfully");
    }).catch(error => {
        res.status(500).send(`Error creating recipe: ${error.message}`);
    });
});

//export
module.exports = router;