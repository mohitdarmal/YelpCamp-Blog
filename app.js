const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOveride = require('method-override');
const {ObjectID} =require('mongodb');
const port = process.env.PORT || 3000;



//============================App Config=================================
app.set('view engine', 'ejs');
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOveride('_method'));
// parse application/json
app.use(bodyParser.json())

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
mongoose.connect('mongodb+srv://Mohit-Yelp:Mohit@321@yelpcamp-blog-gysio.mongodb.net/test?retryWrites=true || mongodb://localhost:27017/YelpCamp-Blog', {
    useNewUrlParser: true
});
var CapmgorundSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    date: {
        type: Date,
        default: Date.now()
    }
});
var Campground = mongoose.model('Campground', CapmgorundSchema);




//================================App Route====================================
app.get('/', (req, res) => {
    res.redirect('/campgrounds');
});


app.get('/campgrounds', (req, res) => {

    Campground.find({}, (err, result) => {
        if (err) {
            return console.log(err);
        }
        res.render('index', {campground : result});
    });
});

app.post('/campgrounds', (req, res) => {
    var data = req.body.blog;
    Campground.create(data, (err, result) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/campgrounds');
    });
    console.log(data)
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
    var id = req.params.id;
  
    if(!ObjectID.isValid(id)){
        return res.send('There is no detail about this Campground! ID is Invalid');
    }
    Campground.findById(id, (err, result) => {
        if(err){
            return console.log(err);
        }
        res.render('detail', {camp : result});
    });
});

app.get('/campgrounds/:id/edit', (req, res) => {
    var id = req.params.id;
    Campground.findById(id, (err, result) => {
        if(err){
            return console.log(err);
        }
        res.render('edit', {blog : result});
    })
    // res.render('edit', {});
});

app.put('/campgrounds/:id', (req, res) => {
    var id = req.params.id;
    var data = req.body.blog;
    console.log(req.body.title)
    Campground.findByIdAndUpdate(id, data, (err, result) => {
        if(err){
            return console.log(err);
        }
        res.redirect('/campgrounds/' + id);
    });
});

app.delete('/campgrounds/:id', (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, result) => {
        if(err){
            return console.log(err);
        }
        res.redirect('/campgrounds');
        console.log(result);
    });
});


app.listen(port, () => {
    console.log(`App Has Started on Port ${port}`);
});