const express = require('express');
const router = express.Router()
const User = require('./../models/User')

// Endpoint handling user creation / signup
router.post('/', (req, res)=>{
    // Extract information from request
    let {userName, email, password} = req.body;

    console.log("The user was received", userName)

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
        console.error(message, error);

        // Send error status and message o the frontend
        res.status(500).json({error, message})

    })
})

// Handling user login
router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    console.log("A user was received", email)

    User.findOne({email})
    .then(result=>{
        if(result){
            console.log("A user was found", result)
            if(result.validPassword(password)===true){
                res.status(200).json({message:"Login successful"})
            }
            else{
                res.status(403).json({message:"Invalid credentials"})
            }
            // res.status(200).json({result})
        }
        else{
            console.log("No user was found")
            res.status(404).json({message:"That user does not exist"})
        }
    })
    .catch(error=>{
        // Create custom error message
        let message = `There was an error logging in user with email ${email}`
        // Log error message to the terminal
        console.error(message, error);

        // Send error status and message o the frontend
        res.status(500).json({error, message})

    })
})

// Endpoint for getting all users
router.get('/', (req, res)=>{
    User.find()
    .then(result=>{
        console.log("Result from getting all users", result);
        res.status(200).json({result})
    })
    .catch(error=>{
        // Create custom error message
        let message = `There was an error getting all users from the database`
        // Log error message to the terminal
        console.error(message, error);

        // Send error status and message o the frontend
        res.status(500).json({error, message})

    })
})

module.exports = router