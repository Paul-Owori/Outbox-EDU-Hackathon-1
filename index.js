//Call express / server package 
const express = require('express');

// Setup express server
const app = express();

// Imoport routes
const userRoutes = require('./server/routes/users')

const path = require('path')

// Import mongoose to handle database connection
const mongoose = require('mongoose')


// Setup port
const port = process.env.PORT || 3000


// Setup middleware
app.use(express.json())

// Setup static folder
app.use(express.static("./client/public"));

// Setup routes
app.use("/users", userRoutes);

// Setup homepage
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, "/client/index.html")); 
})

// Start app

// MongoDB Address / URI
const DB_URI ="mongodb+srv://Paule:Paule@byarentcluster-gfhab.mongodb.net/hackathon-1?retryWrites=true&w=majority";

// Connect to mongoDB then start the app
mongoose.connect(
    DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(()=>{
    // Once the database is connected, log this to the console
    console.log("Database is connected");

    // Start the app
    app.listen(port,()=>{
        console.log(`App is listening on port: ${port}`)
    })
})
.catch(error=>{
    console.error(`Error connecting to database with URI: ${DB_URI}`)
})


