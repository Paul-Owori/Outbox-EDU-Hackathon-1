const express = require('express');
const router = express.Router()
const User = require('./../models/User')

// Endpoint handling user creation / signup
router.post('/', (req, res)=>{
    // Extract information from request
    let {userName, email, password} = req.body;

    // Create new User object
    let newUser = new User({
        userName,
        email
    });
    // Set password for new user 
    newUser.setPassword(password);

    // Save new User to the database
    newUser.save()
    .then(result=>{
        console.log(`Result after attempting to save user ${newUser.userName}`)
        res.status(201).json({result})
    })
    .catch(error=>{
        // Create custom error message
        let message = `There was an error saving new user ${newUser.userName} to the database`
        // Log error message to the terminal
        console.error(message);

        // Send error status and message o the frontend
        res.status(500).json({error, message})

    })
})