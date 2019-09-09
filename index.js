const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./dbconfig/database');
const passport = require('passport');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();


// Note model
const User = require('./dbmodels/user');


// Product model
const Product = require('./dbmodels/product');

// Cart model
const Cart = require('./dbmodels/cart');

// Serve static files from the React app
app.use(express.static('build'));

//passport
app.use(passport.initialize());
require('./passport')(passport);
//mongoose connect
mongoose.connect(process.env.MONGODB_URI || config.database, { useNewUrlParser: true, useFindAndModify: false} );

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


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

// parse application/json
app.use(bodyParser.json());
app.use('/', require('./api'));

//test for users
// app.get('/users', (req, res) => {
//   res.json(User)
// });

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port: ${PORT}`)
})