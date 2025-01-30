const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const expressSession = require('express-session');
const path = require("node:path");
const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const routes = require('./routes');
//const models = require('./routes/models')



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
}));

app.use(
  expressSession({
      cookie: {
          maxAge: 1000 * 60 * 60 * 24
      },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(
          new PrismaClient(),
          {
              checkPeriod: 2 * 60 * 1000, // ms
              dbRecordIdIsSessionId: true,
              dbRecordIdFunction: undefined,
          },
      ),
  }),
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
  new LocalStrategy(async (username, password, done) => {
      try {
          const rows = await prisma.user.findUnique({
              where: {
                  username: 'Nikola'
              }
          })
          const user = rows;
          if (!user) {
              return done(null, false, { message: "Incorrect username" });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
              // passwords do not match!
              return done(null, false, { message: "Incorrect password" })
          }
          return done(null, user);
      } catch (err) {
          return done(err);
      }
  })
);

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
      const rows = await prisma.user.findUnique({
          where: {
              id: id
          }
      })
      const user = rows;
      done(null, user);
  } catch (err) {
      done(err);
  }
});
app.post(
  "/log-in",
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
      failureMessage: "Incorrect password or username"
  })
);

/*app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next();
});*/

app.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
   if(err) {
     res.sendStatus(403);
   } else {
    res.json({
      message: 'Post created...',
      authData
    })
   }
  })
 
})

app.post('/login', async (req, res)  => {
  const user = await prisma.user.findUnique({
    where: {
      username: 'Nikola'
    }
  })
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
})



function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/posts', routes.posts);
app.use('/comments', routes.comments);
app.use('/signup', routes.signup);

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );