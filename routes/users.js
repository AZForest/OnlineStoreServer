const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.status(400).json('Error is: ' + err));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const orders = [];
    const cart = [];

    const newUser = new User({
        userName,
        password,
        orders,
        cart
    });

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error iis: ' + err));
})

router.patch('/:userid/addProduct', async (req, res) => {
    /* console.log(req.body);
    console.log(req.body.prevCart);
    console.log(req.body.product); */

    let newCart;
    if (!req.body.updateCount) {
        newCart = req.body.prevCart.concat(req.body.product);
        //console.log(newCart);
    } else {
        for (let i = 0; i < req.body.prevCart.length; i++) {
            if (req.body.prevCart[i].name === req.body.product.name) {
                req.body.prevCart[i].count += 1;
            }
        }
        newCart = req.body.prevCart;


    }

    
    try {
        const updatedUser = await User.updateOne(
            {_id: req.params.userid},
            { $set: { cart: newCart } }
            );
        res.send(await updatedUser);
    } catch (err) {
        res.json(err);
    }
    
})

router.patch('/:userid/removeProduct', async (req,res) => {
    let newCart = req.body.prevCart;
    let index = -1;
    for (let i = 0; i < newCart.length; i++) {
        if (newCart[i].name === req.body.product.name) {
            index = i;
        }
    }
    if (!req.body.updateCount) {
        if (index !== -1 ) {
            newCart.splice(index, 1);
        }
    } else {
        if (index !== -1 ) {
            newCart[index].count -= 1;
        }
    }
    
    
    try {
        const updatedUser = await User.updateOne(
            {_id: req.params.userid},
            { $set: { cart: newCart }}
        );
        res.send(await updatedUser);
    } catch (err) {
        res.json(err);
    }
})

router.patch('/:userid/addOrder', async (req, res) => {
    let newOrders = req.body.prevOrders;
    newOrders.push(req.body.newOrder);

    try {
        const updateUser = await User.updateOne(
            {_id: req.params.userid},
            { $set: { orders: newOrders }}
        );
        res.send(await updateUser);
    } catch ( err ) {
        res.json(err);
    }
})

router.patch('/:userid/deleteOrder', async (req, res) => {
    let orders = req.body.orders;
    let deleteOrder = req.body.delOrder;

    let index = -1;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === deleteOrder.id) {
            index = i;
        }
    }
    if (index > -1) {
        orders.splice(index, 1);
    }
    
    try {
        const updateUser = await User.updateOne(
            {_id: req.params.userid},
            { $set: { orders: orders }}
        );
        res.send(await updateUser);
    } catch (err) {
        res.json(err);
    }
})

router.patch('/:userid/resetCart', async (req,res) => {
    try {
        const updateUser = await User.updateOne(
            {_id: req.params.userid},
            { $set: { cart: [] }}
        );
        res.send(await updateUser);
    } catch ( err ) {
        res.json(err);
    }
})

module.exports = router;