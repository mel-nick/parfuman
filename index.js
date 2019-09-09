const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./dbconfig/database');
const passport = require('passport');
const PORT = 5000;
const app = express();

// Note model
const User = require('./dbmodels/user');


// Product model
const Product = require('./dbmodels/product');

// Cart model
const Cart = require('./dbmodels/cart');

//passport
app.use(passport.initialize());
require('./passport')(passport);


// app.param('alias', function (req, res, next, id) {
//   // try to get the user details from the User model and attach it to the request object
//   Product.find(id, function (err, user) {
//     if (err) {
//       next(err)
//     } else if (code) {
//       req.code = code
//       next()
//     } else {
//       next(new Error('failed to load alias'))
//     }
//   })
// })



//mongoose connect
mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false} );

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