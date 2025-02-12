const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

exports.postsGet = async (req, res) => {
    const posts = await prisma.post.findMany({
        where: {
            postName: 'posts'
        }
    })
    return res.send(posts[0]);
}

exports.postGet = async (req, res) => {
    const id = Number(req.params.postId);
    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    return res.send(post)
}

exports.postPost = async (req, res, next) => {
const bearerHeader = req.body.accessToken;

  if(typeof bearerHeader !== 'undefined' && bearerHeader !== null) {
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[0];

    req.token = bearerToken;
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
        console.log(err)
      }else  {
        req.user = user
        }
     // next()
    })
   // next();
  } else {
    return res.send({message: "jwt expired"})
  }

  if(req.user) {
    const token = req.token
const publish = JSON.stringify(req.body.publish)
    await prisma.post.create({
        data: {
            postName: req.body.postname,
            postText: req.body.text,
            published: publish,
            userId: req.user.user.id
        }
    })

    return res.send({message:'Created Post' ,token})
  } else {
    return res.json({message: "jwt expired"})
  }
}