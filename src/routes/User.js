// Users controller logic and functionality

//imports
const express = require('express');
const router = express.Router() 
const { check, validationResult } = require('express-validator');
const User = require('../models/User'); 

//get user by id
router.get('/id/:userId', (req, res)=>{
    const id = req.params.userId
    User.findByPk(id)
        .then(user=>{
            if(!user) {
                return res.status(404).send(`user with id ${id} not found`)
            }
        res.status(200).send(user);
        })
        .catch(error => {
            res.status(500).send(`Error retreiving user with id ${id}`)
        })
})

//get user by username
router.get('/username/:username', (req,res) =>{
    const username = req.params.username
    User.findOne({ where: { username } })
        .then(user=>{
            if(!user) {
                return res.status(404).send(`user with username ${username} not found`)
            }
            res.status(200).send(user);
        })
        .catch(error=>{
            res.status(500).send(`Error retreiving user with username ${username}: ${error.message}`)
        })
})

//get all users
router.get('/',(req,res)=>{
    User.findAll().then(user=>{
        let uList = JSON.stringify(user);
        res.setHeader('Content-type','application/json');
        res.send(uList);
        res.status(200);
    })
})

//get user by id
router.get('/id/:user_id', (req,res)=>{
    const id= req.params.user_id
    findByPk(id).then(user=>{
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    })
})

//get user by username
router.get('/username/:username', (req,res)=>{
    const username=req.params.username
    findOne({ where: { username:username } })
    .then(user=>{
        if(!user) {
            return res.status(404).json({ error: 'Username not found '});
        }
        res.status(200).json(user);
    })
})

//post new user
router.post('/', [
    //requires the username to be between 4 and 20 characters long, and contain only letters, numbers, underscores, and hyphens or does not exist in database
    check('username')
        .notEmpty()
        .matches(/^[a-zA-Z0-9_-]{4,20}$/)
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) {
                throw new Error('Username already in use');
            }
        }),
    //requires the email address to contain an '@' symbol followed by a domain name
    check('email')
        .notEmpty()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .custom(async (value) => {
            const email = await User.findOne({ where: { email: value } });
            if (email) {
                throw new Error('Email already exists');
            }
        }),
    //requires the password to be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, and one digit.
    check('password')
        .notEmpty()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Please fill in all required fields',
            errors: errors.array()
        });
    }

    // creating a new user in db
    const userData = req.body;
    User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
    }).then(() => {
        res.status(201).send("User created successfully");
    }).catch(error => {
        res.status(500).send(`Error creating user: ${error.message}`);
    });
});

//update user by id
router.put('/id/:user_id', (req,res)=>{
    const id = req.params.user_id;
    User.findByPk(id).then(user =>{
        const userData = req.body;
        User.update({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName
        },{
            where: { user_id:id }
        })
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).send('User update successful');
    })
})


//export
module.exports = router;