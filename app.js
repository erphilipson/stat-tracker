const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/routes')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('./models/users')
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(passport.initialize());

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/stat-tracker');

app.use('/api/', apiRoutes);
app.use('/api/', apiRoutes, passport.authenticate('basic'));
app.use(userRoutes)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user){
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }
      return done(null, false);
    });
  }
));

app.get('/login',
  passport.authenticate('basic', {session: false}), function (req, res) {
    res.send('You have been authenticated, ' + req.user.name);
  }
);

app.get('/logout', function (req, res) {
  req.logOut();
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('Connected!')
})
