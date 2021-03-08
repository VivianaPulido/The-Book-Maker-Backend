const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
 
  module.exports = app => {
    app.use(
      session({
        secret: process.env.SESS_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
          sameSite: false,
          httpOnly: true,
          maxAge: 86400000
        },
        store: new MongoStore({
          
          mongooseConnection: mongoose.connection,
          // ttl => time to live
          ttl: 60 * 60 * 24 
        })
      })
    );
  };