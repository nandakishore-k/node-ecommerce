const mongoose = require('mongoose');
require('dotenv').config();


//db connect
const connectDb = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Connection successful"))
        .catch(err => console.error("Connection failed:", err));
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {connectDb}