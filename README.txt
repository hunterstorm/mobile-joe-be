

API requests:



INGREDIENT TABLE




	type: GET 	path: '/Ingredients' :

		this request will return all ingredient JSON objects stored in the database
		
		example: 
			{
			"ingredientId": 1,
			"ingredientName":"naval orange",
			"ingredientType":"produce"
			},
			{
			"ingredientId": 2,
			"ingredientName":"honeycrisp apple",
			"ingredientType":"produce"
			}




	type: GET 	path: '/Ingredients/id/:ingredient_id' :
		
		this request will return an ingredient JSON object by id
		
		example: 	path: '/Ingredients/id/1':

			return:
				
			{
			   "ingredientId":1,
			   "ingredientName:"naval orange",
			   "ingredientType":"produce"
			}




	type: GET 	path: '/Ingredients/name/:ingredient_name' :
		
		this request will return an ingredient JSON object by name
		
		example: 	path: '/Ingredients/id/naval%20orange':

			return:
				
			{
			   "ingredientId":1,
			   "ingredientName:"naval orange",
			   "ingredientType":"produce"
			}




	type: GET 	path: '/Ingredients/type/:ingredient_type' :
		
		this request will return an array of ingredient JSON objects by type
		
		example: 	path: '/Ingredients/type/produce':

			return:

			[
				
			   {
				"ingredientId":1,
				"ingredientName:"naval orange",
				"ingredientType":"produce"
			   },
			   {
				"ingredientId": 2,
				"ingredientName":"honeycrisp apple",
				"ingredientType":"produce"
			   }
			]



	type: POST 	path: '/Ingredients' :
		
		this request will send a JSON object to the server to be stored into Ingredients table
		Ingredient model will automatically assign an ingredient ID as the PK

		example:

			input:
				{
				   "ingredientName":"strawberries",
				   "ingredientType":"produce"
				}
		
			stored as:
				[
				   {
					"ingredientId":3,
					"ingredientName": strawberries,
					"ingredientType": produce
				   }
				]




	type: PUT 	path:  '/Ingredients/id/:ingredient_id' :
		
		this request will update any or all columns of any one row by ingredient ID
		ID is fixed and does not update

		example:	path: '/Ingredients/id/1':

			input:
				{
				   "ingredientName" : "valencia orange",
				}

			stored as:
				
				{
				   "ingredientId":1,
				   "ingredientName":"valencia orange",
				   "ingredientType":"produce"
				}
				




	type DELETE path:  '/Ingredients/id/:ingredient_id' :

		this request will delete an ingredient JSON object stored in the database
	
		example: DELETE path: '/Ingredients/id/3

			stored as:
				does not exist




RECIPE TABLE




	type GET	 path:  '/Recipes' :

		this request will return all recipe JSON objects stored in the database

			example: 

				return:

				[			
				    {
				        "recipeId": 1,
				        "recipeName": "chili egg pancakes",
				        "recipeType": "breakfast",
				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1
				    },
				    {
				        "recipeId": 2,
				        "recipeName": "spin dip pasta",
				        "recipeType": "italian-modern fusion",
				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1
				    }
				]




	type GET	path: '/Recipes/id/:recipe_id' :

		this request will return a recipe JSON object by id

			example:	path: '/Recipes/id/1'

				return:

				{
				    "recipeId": 1,
				    "recipeName": "chili egg pancakes",
				    "recipeType": "breakfast",
				    "description": "lorem ipsum blah blah i'm the best",
				    "owner": 1
				}


	type GET	path: '/Recipes/name/:recipe_name' :

		this request will return a array of recipe JSON objects by recipe name

		
			example:	path: '/Recipes/name/chili%20egg%20pancakes'

				return:

				[
				   {
					"recipeId": 1,
					"recipeName": "chili egg pancakes",
					"recipeType": "breakfast",
					"description": "lorem ipsum blah blah i'm the best",
					"owner": 1
				   },
				   {
					"recipeId": 1,
					"recipeName": "chili egg pancakes",
					"recipeType": "breakfast",
					"description": "lorem ipsum blah blah i'm the second 							best",
					"owner": 2
				   }

				]

	type GET	path: '/Recipes/type/:recipe_type':
		
		this request will return an array of recipe JSON objects by recipe type

			example:	path: '/Recipes/type/italian-modern%20fusion'

				return:

				[
				    {
				        "recipeId": 2,
				        "recipeName": "spin dip pasta",
				        "recipeType": "italian-modern fusion",
				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1
				    },
				   {
					"recipeId": 6,
					"recipeName":"spaghetti squash with chicken meatballs"
					"recipeType": "italian-modern fusion",
					"description": "lorem ipsum blah blah i'm just as good"
					"owner":2
				   }
				]


	type GET	path: '/Recipes/owner/:owner':

		this request will return an array of recipe JSON objects by user_id conjuction 'owner'

			example:	path: '/Recipes/owner/1' :

				return:

				[				
				    {
				        "recipeId": 1,
				        "recipeName": "chili egg pancakes",
				        "recipeType": "breakfast",
				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1
				    },
				    {
				        "recipeId": 2,
				        "recipeName": "spin dip pasta",
				        "recipeType": "italian-modern fusion",
				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1
				    }
				]

	


	type POST	path: '/Recipes' :

		this request will send a JSON object to the server to be stored into 			
		Recipes table
		Recipe model will automatically assign a recipe ID as the PK
		ingredientList is an array of integers used to map to the ingredient PKs associated 	
		with the recipe	
	
			example:

				input:
					{
					   "recipeName": "spin dip pasta",
					   "recipeType": "italian-modern fusion",
					   "description: "lorem ipsum blah blah i'm the best",
,					   "owner":1,
					   "ingredientList":[8,9,10]
					}
		
				stored as:
					[
					   {
						"recipeId":5,
						"recipeName": "spin dip pasta",
						"recipeType": "italian-modern fusion",
						"description": "lorem ipsum blah blah i'm the best",
						"owner": 1
					   }
					]


	type: PUT 	path:  '/Recipes/id/:recipe_id' :
		
		this request will update any or all columns of any one row by recipe_ID
		ID is fixed and does not update

		ingredientList may also update (this is also how you remove ingredients) so long as 			
		the ingredient being added exists

			example:	path: '/Recipes/id/2':

				input:
					{
					   "recipeName": "spinach & artichoke dip pasta",
					   "ingredientList":[8,9,10,11]
					}

				stored as:
				
					{
					   "recipeId":2,
					   "recipeName": "spinach & artichoke dip pasta",
					   "recipeType": "italian-modern fusion",
					   "description": "lorem ipsum blah blah i'm the best",
					   "owner": 1
					}
				


	type DELETE 	path:  '/Recipes/id/:recipe_id' :

		this request will delete a recipe JSON object stored in the database
	
			example: DELETE 	path: '/Ingredients/id/2

				stored as:
					does not exist




RecipeIngredients Table


	type: GET	path: '/RecipeIngredients/ingredient/:ingredient_id' :
		
		this request will return an array of recipe JSON objects containing a specific ingredient using the ingredient ID

		
			example:	path: '/RecipeIngredients/ingredient/1

				return:

				[
				    {
				        "recipeName": "chili egg pancakes",
				        "recipeType": "breakfast",
 				        "description": "lorem ipsum blah blah i'm the best",
				        "owner": 1,
 				        "recipe_ingredients": {									                    "recipe_id": 1,
 			                    "ingredient_id": 1
			           	 }
				     }
			    
				]

	
	type: GET	path: '/RecipeIngredients/recipe/:recipe_id' :
	
		this request will return an array of ingredient JSON objects for a specific recipe using the recipe ID

			
			example:	path: '/RecipeIngredients/recipe/1

				return:

				[
				    {
				        "ingredientName": "eggs",
				        "ingredientType": "dairy",
				        "recipe_ingredients": {
				            "recipe_id": 1,
				            "ingredient_id": 1
				        }
 				   },
				   {
				        "ingredientName": "taiwanese green onion pancake",
				        "ingredientType": "frozen",
 				        "recipe_ingredients": {
				            "recipe_id": 1,
 				            "ingredient_id": 2
  				      }
  				   },
				   {
				        "ingredientName": "crunchy chili onion roll",
				        "ingredientType": "grocery",
				        "recipe_ingredients": {
 				           "recipe_id": 1,
 				           "ingredient_id": 3
				        }
				   },
				   {
 				       "ingredientName": "olive oil",
				        "ingredientType": "grocery",
				        "recipe_ingredients": {
				            "recipe_id": 1,
				            "ingredient_id": 7
				        }
 				    }
				] 





USER TABLE

	type: GET	path: '/Users'

		this request will return an array of all user JSON objects

			example:
	
					
				return:
				[

				   {
					"userId": 1,	
					"username": "hunterstorm",
				        "email": "huntersreese@gmail.com",
 				        "password": "Password123",
				        "firstName": "hunter",
				        "lastName": "reese"
				    },
				    {
				        "userId": 2,
				        "username": "haleyfisher",
				        "email": "haleyfishere@gmail.com",
 				        "password": "Password123",
				        "firstName": "haley",
				        "lastName": "fisher"
				   }
				]


	
	
	type: GET	path: '/Users/id/:userId'
		
		this request will return a user JSON object by id

			example:	path: '/Users/id/1' :
				
				return:

				{
				    "userId": 1,
				    "username": "hunterstorm",
				    "email": "huntersreese@gmail.com",
 				    "password": "Password123",
				    "firstName": "hunter",
				    "lastName": "reese"
				}



	type: GET	path: '/Users/username/:username'

		this request will return a user JSON object by username

			example:	path: '/Users/username/hunterstorm' :

				return:	

				{
				    "userId": 1,
				    "username": "hunterstorm",
				    "email": "huntersreese@gmail.com",
 				    "password": "Password123",
				    "firstName": "hunter",
				    "lastName": "reese"
				}
				

	type: POST	path: '/Users'
		
		this request will send a JSON object to the server to be stored into 			
		Users table
		
		username requirements: 4-20 char.... only letters, numbers underscores and hyphens	
			username cannot exist in database

		password requirements: at least 8 char, contains 1 lowercase letter, one uppercase and digit
		
		email requirements: @ symbol and domain name

		Recipe model will automatically assign a recipe ID as the PK


			example:
		
				input:

				{
				    "username": "hunterstorm",
				    "email": "huntersreese@gmail.com",
 				    "password": "Password123",
				    "firstName": "hunter",
				    "lastName": "reese"
				}

				stores as:

				{
				    "userId": 1,
				    "username": "hunterstorm",
				    "email": "huntersreese@gmail.com",
 				    "password": "Password123",
				    "firstName": "hunter",
				    "lastName": "reese"
				}


	type: PUT 	path:  '/Users/id/:user_id' :
		
		this request will update any or all columns of any one row by user_ID
		ID is fixed and does not update

			example:	path: '/Users/id/2':

				input:
					{
					   "password": "TSwift22"
					}

				stored as:
				
					{
				    
				            "userId": 2,
				            "username": "haleyfisher",
				            "email": "haleyfishere@gmail.com",
 				            "password": "Tswift22",
				            "firstName": "haley",
				            "lastName": "fisher"
					}
				


	type DELETE 	path:  '/Users/id/:user_id' :

		this request will delete a user JSON object stored in the database
	
			example: DELETE 	path: '/Users/id/1

				stored as:
					does not exist


FAVORITES TABLE

	type GET	path:  '/Favorites/user/:userId' :

	this request will return an array of user's favorite recipes

		example:	path: '/Favorites/user/1

			return:
				[
    				{
        				"recipeName": "chili egg pancakes",
        				"recipeType": "breakfast",
        				"description": "lorem IPSUM",
        				"owner": 1,
        				"recipeId": 2
    				}
				]

	

	type GET 	path:  '/Favorites/recipe/:recipeId' :

	this request will return an array of user favorites by recipe

			example:	path: '/Favorites/recipe/2

			return:
				[
    				{
        				"userId": 1,
        				"username": "hunterstorm",
        				"firstName": "hunter",
        				"lastName": "reese",
        				"favorites": {
            				"user_id": 1,
            				"recipe_id": 1
        				}
    				}
				]


	type PUT 	path:	'/Favorites/user/:userId/recipe/:recipeId' :

	this request will add recipe as favorite per user

		example:	path: '/Favorites/user/1/recipe/1

		stored as:
				[
					{
					    "recipeName": "chili egg pancakes",
        				"recipeType": "breakfast",
        				"description": "lorem IPSUM",
        				"owner": 1,
        				"recipeId": 2	
					},
					{
					    "recipeName": "chocolate chip pancakes",
        				"recipeType": "breakfast",
        				"description": "lorem IPSUM",
        				"owner": 1,
        				"recipeId": 1	
					}
				]


	type DELETE		path: '/Favorites/user/:userId/recipe/:recipeId :

			this request will delete a favorite association for user and recipe
	
			example: DELETE 	path: '/Favorites/user/1/recipe/2'

				stored as:
					does not exist
					
					
					
					
Images Bucket

	type GET  path: '/Images/:imageName'

		this request will retrieve image based on the name of the recipe in the S3 bucket.  imageName can be retrieved from it's respective recipeId

			example:	path: '/Images/avo-hash-stack.jpg' :

			returns an image of avocado hash stack breakfast from S3 object bucket


			
