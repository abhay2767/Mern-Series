const mongoose = require('mongoose');
const MongoUri = process.env.MONGO_URI


const connectToDb = () => {
    const connectionParams = {
        useNewUrlParser: true,
        
    };

    mongoose.connect(MongoUri, connectionParams)
    .then(()=>{
        console.log("Successfully connected to "+mongoose.connection.host)
    }).catch((err)=>{
        console.log("Can't be able connect "+err)
    })
};
module.exports = connectToDb