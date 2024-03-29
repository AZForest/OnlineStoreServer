const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
    .then(products => {
        console.log(products);
        res.json(products);
    })
    .catch(err => res.status(400).json('Error is: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;

    const newProduct = new Product({
        name,
        type,
        price
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error iis: ' + err));
})



module.exports = router;