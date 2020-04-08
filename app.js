const express=require('express');
//importing body parser

const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app=express();

//setting app to use static file
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'jhfjsahjfhsjdhfjsdhfjhdsjkhkjfhdskjhfkjdhsfkjdhskfjhdjskfhdksjfhiuirwuqor',
    resave: false,
    saveUninitialized: false,
  }))

app.use(cors());
//importing mongoose
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://stls:stls@cluster0-tkfjg.mongodb.net/slms?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
});
//importing MCU route
const mcuRoutes = require('./routes/mc');

const landingRouter=require('./routes/landing');
//dashboard
const dashBoardRouter=require('./routes/dashboard');
//setting view engine to ejs

app.set('view engine','ejs');

app.use('/',landingRouter);

app.use('/admin',dashBoardRouter);

app.use('/lamp',mcuRoutes);

module.exports=app;