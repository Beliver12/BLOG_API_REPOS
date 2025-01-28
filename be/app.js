const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
require('dotenv').config()
const express = require('express');
//const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const routes = require('./routes');
const models = require('./routes/models')

//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next();
});

app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/posts', routes.posts);
app.use('/comments', routes.comments);

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );