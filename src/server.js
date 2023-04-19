//main server file

// libraries
const http = require('http');
const express = require ('express')
const app = express();
const sequelize = require('./sequelizeConnection');
const cors = require('cors');

// router variables
const userRoute = require ('./routes/Users');
const recipeRoute = require ('./routes/Recipes');
const ingredientRoute = require ('./routes/Ingredients');
const recipeIngredientRoute = require ('./routes/RecipeIngredients');
const favoriteRoute = require ('./routes/Favorites');
const retrieveImageRoute = require ('./routes/retrieveImage');

// model variables
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const Ingredient = require('./models/Ingredient');
const RecipeIngredient = require('./models/RecipeIngredient');
const Favorite = require('./models/Favorite');


// middleware functions
app.use(express.json());
app.use(cors());

//sequelize routes
app.use('/Users', userRoute);
app.use('/Recipes', recipeRoute);
app.use('/Ingredients', ingredientRoute);
app.use('/RecipeIngredients', recipeIngredientRoute);
app.use('/Favorites', favoriteRoute);

// AWS S3 route
app.use('/Images', retrieveImageRoute);

// table associations
User.hasMany(Recipe,{
    foreignKey: 'owner'
});
Recipe.belongsTo(User, {
    foreignKey: 'owner'
});

User.belongsToMany(Recipe, { 
    through: Favorite,
    foreignKey: 'user_id'
});
Recipe.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'recipe_id'
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