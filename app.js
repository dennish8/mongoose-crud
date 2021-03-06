const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'mongoose_crud';      // REPLACE WITH YOUR DB NAME
mongoose.connect(`mongodb://${server}/${database}`)
.then(() => console.log('Database connection successful'))
.catch((err) => console.error('Database connection error'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes_book = require('./routes/books');
const routes_customer = require('./routes/customers');
const routes_transaction = require('./routes/transactions');

app.use('/book',routes_book);
app.use('/customer',routes_customer);
app.use('/transaction',routes_transaction);

app.listen(3000,()=>console.log(`Listening on port 3000`));