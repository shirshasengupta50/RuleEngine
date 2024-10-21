const mongoose = require("mongoose");
const MONGODB_URI = "mongodb+srv://shirshasengupta50:ShirshaSengupta5@cluster0.9q96d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbConnect = async()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error in Connecting DB");
        console.log(error);
        throw error;
    }
}

module.exports = dbConnect;

