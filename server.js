const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const hbs = require('hbs');
const html = require('html');
const config = require('./config/config');
const port = process.env.PORT;

const badmintonRoutes = require("./routes/badmintonRoutes")
const chessRoutes = require("./routes/chessRoutes");
const userRoutes = require('./routes/userRoutes');

const publicPath = path.join(__dirname,'/public');
const utilPath = path.join(__dirname,'/public/js/utils');

mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.set('view engine','hbs');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res) => {
//   res.sendFile('chessPhotos.html',{root:__dirname + '/public'});
     res.sendFile('register.html',{root:__dirname + '/public'})
});
  
app.use(userRoutes);
app.use(chessRoutes);
app.use(badmintonRoutes)


app.get('*',(req,res) => {
    res.status(404).send();
})


console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true}).then(result => {
    var server = app.listen(port,(res) => {
        console.log(`Server is up on port ${port}`);
    })
}).catch(e => {
    console.log('Unable to connect to the database');
});

//mongodb://127.0.0.1:27017/chess

//mongodb+srv://n462:<password>@mycluster-ebxbe.mongodb.net/test?retryWrites=true&w=majority
 