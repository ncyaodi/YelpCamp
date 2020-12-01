const express = require('express');
const path = require('path');
const Joi = require('joi');
const ejsMate = require('ejs-mate');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', express.urlencoded(), (req, res) => {
    res.render('home')
    if (!req.body || req.body.length === 0) console.log('req is empty')
    console.log(req.body)
});



app.listen(3000, () => {
    console.log('Serving on port 3000')
})

