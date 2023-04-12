//main server file

// libraries
const http = require('http');
const express = require ('express')
const app = express();
const sequelize = require('./sequelizeConnection');
const cors = require('cors');

// router variables
const userRoute = require ('./routes/User');
const recipeRoute = require ('./routes/Recipes');
const ingredientRoute = require ('./routes/Ingredients');
const recipeIngredientRoute = require ('./routes/RecipeIngredients');

// model variables
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const RecipeIngredient = require('./models/RecipeIngredient');


// middleware functions
app.use(express.json());
app.use(cors());

app.use('/Users', userRoute);
app.use('/Recipes', recipeRoute);
app.use('/Ingredients', ingredientRoute);
app.use('/RecipeIngredients', recipeIngredientRoute);

// table associations
User.hasMany(Recipe,{
    foreignKey: 'user_id'
});
Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
    foreignKey: 'recipe_id'
});
  
Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: 'ingredient_id'
});

// authenticating connection with the database
sequelize.authenticate().then(()=>{
    console.log("database connection successful")
    }).catch((error)=>{
        console.log(error);
})

// connect to database and start server
sequelize.sync().then(()=>{
    console.log("tables created successfully");
})

const server = http.createServer(app);
server.listen(3000, '127.0.0.1',()=>{
    console.log('server started');
})