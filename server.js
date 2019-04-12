const express = require('express');

const app = express();

const {
    db
} = require('./db');

const vendors = require('./routes/vendors')
const products = require('./routes/products');
const users = require('./routes/users');
const cart = require('./routes/cart');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static(__dirname + '/public'))

// Use Routes
app.use('/vendors', vendors);
app.use('/products', products);
app.use('/users', users);
app.use('/cart', cart);


db.sync()
    .then(() => {
        app.listen(5000)
    })