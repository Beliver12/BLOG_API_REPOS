const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const session = require('express-session');

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


const app = express();


app.use(cors({ origin: 'http://localhost:5173', credentials: true, allowedHeaders: ['Content-Type'],}));
app.use(express.json());

app.use(
 session({
      secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 86400000
  },
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

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization', );
  next();
  });


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


passport.use(
  new LocalStrategy(async (username, password, done) => {
    
      try {
          const rows = await prisma.user.findUnique({
              where: {
                  username: username
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
app.post('/login', passport.authenticate('local'), async (req, res)  => {
  //req.user
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })
  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token,
      message: "true"
    });
  });
})
app.get("/a", (req, res) => {
  console.log(req.user)
})
app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/posts', routes.posts);
app.use('/comments', routes.comments);


app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );