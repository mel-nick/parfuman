const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./dbconfig/database');
const passport = require('passport');
const path = require('path');


const PORT = process.env.PORT;
const app = express();

// parse application/json
app.use(bodyParser.json());
app.use('/', require('./api'));

// Serve static files from the React app

//mongoose connect
mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false} );

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

if (process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','build','index.html'));
  });
}

// Note model
const User = require('./dbmodels/user');


// Product model
const Product = require('./dbmodels/product');

// Cart model
const Cart = require('./dbmodels/cart');



//passport
app.use(passport.initialize());
require('./passport')(passport);



// Mongoose connection
const db = mongoose.connection;

// Check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function (err) {
    console.error(err);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port: ${PORT}`)
})