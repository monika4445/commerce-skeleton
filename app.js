const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose()
const userSchema = require('./models/users-schema')
const productSchema = require('./models/products-schema')
const cartSchema = require('./models/carts-schema')
const cartItemsSchema = require('./models/cart-items-schema')
const authRouter = require('./routes/auth-router')
const productRouter = require('./routes/product-router')
const mainRouter = require('./routes/main-router')

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.log("Something went wrong");
  }
  console.log('Connected to the database.');
});

userSchema.createUsers(db);
productSchema.createProducts(db);
cartSchema.createCarts(db);
cartItemsSchema.createCartItems(db);

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/', mainRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


