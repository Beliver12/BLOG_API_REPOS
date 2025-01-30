const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

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

