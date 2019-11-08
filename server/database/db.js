const mongoose = require('mongoose');

// MongoDB Address / URI
const DB_URI ="mongodb+srv://Paule:Paule@byarentcluster-gfhab.mongodb.net/hackathon-1?retryWrites=true&w=majority";

// Function to connect to mongoDB
const connect = async ()=>{
    await mongoose.connect(
        DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open",  ()=> {
        console.log("Database is connected");
    });
}

module.exports= {connect}