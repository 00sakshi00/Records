//require library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/records-db');

//acquire the connection if  it is succesfull
const db= mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting DB'));

//up and running 
db.once('open',function(){
    console.log('Succesfully conected to DB');
});