const express=require('express');
//importing body parser

const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb+srv://stls:stls@cluster0-tkfjg.mongodb.net/slms?retryWrites=true&w=majority',
  collection: 'sessions'
});

const app=express();

//setting app to use static file
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())
app.use(csrf({ cookie: true }))

app.use(session({
    secret: 'jhfjsahjfhsjdhfjsdhfjhdsjkhkjfhdskjhfkjdhsfkjdhskfjhdjskfhdksjfhiuirwuqor',
    resave: false,
    saveUninitialized: false,
    store:store
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

app.use((req,res,next)=>{
   res.locals.csrfToken = req.csrfToken();
   next();
})
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