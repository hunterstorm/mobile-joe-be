// imports
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// get favorites by user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favorites = await user.getRecipes({
      through: {
        model: Favorite
      },
      attributes:[ 'recipeName', 'recipeType', 'description', 'owner','recipeId','imageName']
    });

    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// get favorites by recipe
router.get('/recipe/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const favorites = await recipe.getUsers({
      attributes: ['userId','username','firstName','lastName']
    });
    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// user add as favorite
router.put('/user/:userId/recipe/:recipeId', async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findByPk(userId);
    const recipe = await Recipe.findByPk(recipeId);
    
    const favorite = await Favorite.findOne({
      where: {
        user_id: user.userId,
        recipe_id: recipe.recipeId
      }
    });

    if (favorite) {
      return res.json({ message: 'Recipe is already favorited' });
    }

    await Favorite.create({
      user_id: user.userId,
      recipe_id: recipe.recipeId
    });

    await user.addRecipe(recipe); 

    res.json({ message: 'Recipe added to favorites' }); 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/user/:userId/recipe/:recipeId', async (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  try {
    const user = await User.findByPk(userId);
    const recipe = await Recipe.findByPk(recipeId);

    const userFavorite = await Favorite.findOne({
      where: {
        user_id: user.userId,
        recipe_id: recipe.recipeId
      }
    });

    const recipeFavorite = await Favorite.findOne({
      where: {
        user_id: recipe.recipeId,
        recipe_id: user.userId
      }
    });

    if (!userFavorite) {
      return res.json({ message: 'Favorite not found' });
    }

    await userFavorite.destroy();

    if (recipeFavorite) {
      await recipeFavorite.destroy();
    }

    await user.removeRecipe(recipe);

    res.json({ message: 'Favorite removed' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;