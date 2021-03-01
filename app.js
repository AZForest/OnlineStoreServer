const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/product.model');

require('dotenv').config();
let port = process.env.PORT || 3005;

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/posts', () => {
    console.log('This is a middleware running');
})

//DB Connection
const uri = process.env.ATLAS_URI;

try {
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } );
    const connection = mongoose.connection;
    connection.once('open', () => {
    console.log("MongoDB connection successful");
})
} catch(err) {
    console.log("This is: " + err);
}

//Routes
app.get('/', (req, res) => {
    res.send('We are on Home');
})
app.get('/posts', (req, res) => {
    res.send('We are on Posts');
})

const productRouter = require('./routes/products');
app.use('/products', productRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

//Init products


app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});