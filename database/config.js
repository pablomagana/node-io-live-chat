const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        const uri = process.env.DB_URI;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('BD online');

    }catch(error){
        console.error(error);
        throw new Error('error connecting database');
    }
}


module.exports = {
    dbConnection
}