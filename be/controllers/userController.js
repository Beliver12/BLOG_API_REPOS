const { PrismaClient } = require('@prisma/client');
const databaseUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.body.accessToken;

  if (typeof bearerHeader !== 'undefined' && bearerHeader !== null) {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[0];

    req.token = bearerToken;
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        req.user = user;
      }
      next();
    });
    // next();
  } else {
    return res.send({ message: 'jwt expired' });
  }
};

exports.logedInGet = async (req, res) => {
  const users = await prisma.user.findUnique({
    where: {
      id: req.user.user.id,
    },
  });
  console.log(users);
  return res.send(users);
};

exports.usersGet = async (req, res) => {
  const users = await prisma.user.findMany({});
  console.log(users);
  return res.send(users);
};



exports.signupUserPost = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (req.body.password !== req.body.password2) {
    return res.status(400).send({
      error: 'Passwords dont match.',
    });
  } else if (user) {
    return res.status(400).send({
      error: 'Username allready in use.',
    });
  }

  console.log(req.body);
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    currentUser = req.body.username;
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });
  });
  res.status(200).send({ message: 'Signup successful!' });
};
