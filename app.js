const express = require('express');
const app = express();


//============================App Config=================================
app.set('view engine', 'ejs');
app.use(express.static('public'))

/* var Campground = [
    {
        title : 'Night Moon',
        image : 'https://images.unsplash.com/photo-1452473767141-7c6086eacf42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=500&q=60',
        description : 'There is no universally held definition of what is and what is not camping.'
    },
    {
        title : 'Camp with Friends',
        image : 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        description : 'Camping is also labeled by lifestyle: Glamping (glamorous camping) combines camping with the luxury and amenities of a home '
    },
] */

//==========================Mongoose Config================================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/YelpCamp-Blog', {useNewUrlParser : true});
var CapmgorundSchema = new mongoose.Schema({
    title : String,
    image : String,
    description : String,
    date : {type : Date, default : Date.now()}
});
var Campground = mongoose.model('Campground', CapmgorundSchema);




//================================App Route====================================
app.get('/', (req, res) => {
    res.redirect('/campgrounds');
});


app.get('/campgrounds', (req, res) => {
    res.render('index');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});


app.listen(4000, () => {
    console.log('App Has Started on Port 4000');
});