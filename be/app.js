const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const routes = require('./routes');

const app = express();

//when deploying change back to this code :

const allowedOrigins = [
  'https://blog-api-repos-y592.vercel.app',
  'https://blog-api-repos-y592-kc3ueetfs-beliver12s-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(
  cors({
    origin: 'https://blog-api-repos-y592.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

function verifyToken(req, res, next) {
  const bearerHeader = req.body.accessToken;

  if (typeof bearerHeader !== 'undefined' && bearerHeader !== null) {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[0];

    req.token = bearerToken;
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
    next();
  } else {
    res.sendStatus(403);
  }
}

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
});

app.get('/log-out', (req, res, next) => {
  res.send({ message: 'loged out' });
});

app.post('/login', async (req, res) => {
  //req.user
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    return res.status(400).send({ error: 'Incorrect username' });
  }
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).send({ error: 'Incorrect password' });
  }
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  jwt.sign(
    { user },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '3600s' },
    (err, token) => {
      res.json({
        user,
        token,
        refreshToken,
        message: 'true',
      });
    }
  );
});

app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/posts', routes.posts);
app.use('/comments', routes.comments);

const PORT = 8080;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = { verifyToken };
