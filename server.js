const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const appRoute = require('./routes');
app.use('/', appRoute);

app.listen(3001, ()=>{
    console.log('Server Berjalan di Port : 3001');
});