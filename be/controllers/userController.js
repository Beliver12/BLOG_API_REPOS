const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

exports.usersGet = async (req, res) => {
    const users = await prisma.user.findMany({
        where : {
          username: 'Nikola'
        }
       })
       console.log(users)
        return res.send(users[0]);
}

exports.userGet = async (req, res) => {
    const id = Number(req.params.userId);
    const user = await prisma.user.findUnique({
      where : {
        id: id
      }
    })
    return res.send(user);
}

exports.signupUserPost = async (req, res) => {
    const user = await prisma.user.findUnique({
      where: {
          username: req.body.username,
      }
  })
  
   if(req.body.password !== req.body.password2) {
    return res.status(400).send({
      error: "Passwords dont match."
    })
   } else if(user) {
    return res.status(400).send({
      error: "Username allready in use."
    })
   }
   
    console.log(req.body)
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if(err) {
        return next(err);
      }
      currentUser = req.body.username;
      const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: hashedPassword,
        },
    });
    })
    res.send({ message: 'Signup successful!' });
}
