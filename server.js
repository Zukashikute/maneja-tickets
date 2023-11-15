const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/users');
const passportSetup = require('./config/passportSetup');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require('./models');

const port = process.env.PORT || 8080;

app.use(session({
createTableIfMissing: true,
db,
secret: process.env.SESSION_SECRET,
resave: true,
saveUninitialized: true,
name: 'sessionId',
store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URI,
}),    
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*')
next()    
})
app.use(cookieParser()) 


//Routes
app.use('/', require('./routes'))
app.use('/auth', authRoutes);




db.mongoose
  .connect(db.url)
  .then(() => {
    app.listen(port,  () => {
    console.log(`DB Connected and server running on ${port}.`)    
    })
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });