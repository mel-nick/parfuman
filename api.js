const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs');
const pug = require('pug');
const checkoutMailer = require('./checkoutMailer');

const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

const User = require('./dbmodels/user');
const Order = require('./dbmodels/order');
const Product = require('./dbmodels/product');
const Cart = require('./dbmodels/cart');

require('dotenv').config();

router.get('/find/:id', function (req, res) {
    Product.findOne({ _id: req.params.id })
        .then(data => { res.send(data) })
    })

router.post('/add-product', function (req, res) {
    const newProduct = new Product({
        brand: req.body.brand,
        title: req.body.title,
        code: req.body.code,
        description: req.body.description,
        category: req.body.category,
        images: req.body.images,
        availability: req.body.availability,
        price: req.body.price,
    });
    newProduct
        .save()
        .then(product => { res.json(product) });
})

router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => { res.json(user) });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.get("/categories/", (req,res)=>{
  Product.find({})
    .then(product => res.send(product) );
});
router.get("/categories/:alias", (req,res)=>{
    Product.find({ alias: req.params.alias })
    .then(product => res.send(product) );
});

// post prod
router.post("/addprod", (req,res)=>{
    Product.create(req.body)
    .then(product => res.send(product) );
});

//put
router.put("/users/:id", (req, res) => {
    User.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            User.findOne({ _id: req.params.id })
                .then(user => res.send(user) );
        });
});

//delete
router.delete("/users/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(user => res.send(user) );
});

router.post("/checkout", async (req, res) => {
    const { user_id, order, address, card } = req.body.data

    console.log('order',order)

    const newOrder = new Order({
        address,
        card,
        order,
        user_id: user_id || 'anonymous',
    })
    await newOrder.save()

    fs.readFile('./checkoutMailer/index.pug', 'utf8', (err, data) => {
        if (err) throw err
        const fn = pug.compile(data)

        // Set pug context
        const html = fn({
            fullname: `${newOrder.address.firstname} ${newOrder.address.lastname}`,
            address: newOrder.address.address,
            city: newOrder.address.city,
            email: newOrder.address.email,
            phone: newOrder.address.phone,
            orderTotal: order
        })

        const message = {
          to: newOrder.address.email, //orderer email
          subject: 'Поздравляем! Вам заказ был успешно обработан!',
          text: `Поздравляем! Вам заказ был успешно обработан!`,
          attachments: checkoutMailer.templateMedia,
          html: html
        }

        checkoutMailer.mailer(message)
    });
    res.status(200).json({
      message: 'Спасибо за Ваш заказ!'
    })
})

router.post("/user_customize", (req, res) => {
    const { data, user_id } = req.body

    if(data.prevpassword && data.newpassword){
        User.findById(user_id, async (err, doc) => {
            const newpassword = await bcrypt.compare(data.prevpassword, doc.password)
            if(newpassword){
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data.newpassword, salt, (err, hash) => {
                        doc.password = hash
                        doc.save()
                        res.status(200).json({
                            user_customize: 'success'
                        })
                    });
                });
            }else{
                res.status(200).json({
                    user_customize: 'fail'
                })
            }
        })
    }

    if(data.addresses){
        User.findById(user_id, async(err, doc) => {
            doc.addresses = {...doc.addresses, ...data.addresses}
            doc.save()
            res.status(200).json({
                user_customize: 'success'
            })
        })
    }
})

router.post("/user_addresses", async (req, res) => {
    const { user_id } = req.body
    const user = await User.findById({ '_id': user_id });

    res.status(200).json({
        addresses: user.addresses
    })
})

router.post("/user_orders", async (req, res) => {
    const { user_id } = req.body
    const orders = []
    const userOrders = await Order.find({
      "user_id": user_id
    });

    userOrders.forEach(item => orders.push(item.order))

    res.status(200).json({
      orders
    })
})

//get user cart:
router.get('/cart/:userId', (req, res) => {
    Cart.findOne({userId: req.params.userId}, function(err, result){     
    if(err) return console.log(err);   
    console.log("Cart is finded");
    // console.log(req.params);
    res.send(result);
    });  
});

//put user cart:
router.put("/user_cart", (req, res) => {
    Cart.updateOne(
        {userId: req.body.currentUserId},        
        {cartProducts: req.body.cartItems},
        function(err, result) {     
            if(err) return console.log(err);
            res.send(result);
            // If is not cart, create:
            if (result.n == 0 && req.body.cartItems) {
                const cart = new Cart({userId: req.body.currentUserId, cartProducts: req.body.cartItems, userName: req.body.currentUserName});
                cart.save(function(err) {
                    if (err) return console.log(err);                     
                });
            }            
        } 
    );
});

module.exports = router;