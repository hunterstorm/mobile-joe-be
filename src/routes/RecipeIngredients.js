// OBM controller logic and functionality

//imports
const express = require('express');
const router = express.Router() 
const RecipeIngredient = require('../models/RecipeIngredient');
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

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

// get recipes with ingredient by ingredient ID
router.get('/ingredient/:ingredient_id', (req,res)=>{
  const id = req.params.ingredient_id

  Ingredient.findByPk(id, {
    include:[{
      model: Recipe,
      through: RecipeIngredient,
      attributes: [ 'recipeName', 'recipeType', 'description', 'owner' ]
    }]
  })
  .then (ingredient => {
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    res.status(200).json(ingredient.recipes);
  })
})

// get recipe ingredients by recipe ID
router.get('/recipe/:recipe_id', (req, res) => {
    const id = req.params.recipe_id;
  
    Recipe.findByPk(id, {
      include: [{
        model: Ingredient,
        through: RecipeIngredient,
        attributes: [ 'ingredientName', 'ingredientType']
      }]
    })
    .then(recipe => {
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe.ingredients);
    })
    .catch(error => {
      res.status(500).send(`Error getting recipe: ${error.message}`);
    });
  });

//export
module.exports = router;
