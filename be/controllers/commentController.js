const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

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

exports.commentsGet = async (req, res) => {
  const id = Number(req.body.id);
  const comments = await prisma.comment.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
  return res.send(comments);
};

exports.commentGet = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);
    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    if (comment.userId === req.user.user.id) {
      return res.send(comment);
    } else {
      return res.send({ message: 'you are not creator of this comment' });
    }
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.commentsPost = async (req, res) => {
  if (req.user) {
    const user = req.user;
    const token = req.token;
    const id = Number(req.body.id);
    await prisma.comment.create({
      data: {
        commentText: req.body.text,
        authorName: req.body.authorName,
        postId: id,
        userId: req.user.user.id,
      },
    });
    return res.send({ message: 'comment created', token, user });
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.commentsDelete = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);

    const comment = await prisma.comment.findMany({
      where: {
        id: id,
      },
    });

    const post = await prisma.post.findMany({
      where: {
        id: comment[0].postId,
      },
    });

    if (
      comment[0].userId === req.user.user.id ||
      post[0].userId === req.user.user.id
    ) {
      await prisma.comment.delete({
        where: {
          id: id,
        },
      });
      const comments = await prisma.comment.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
      });
      return res.send(comments);
    } else {
      return res.send({ message: 'you are not creator of this comment' });
    }
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.myPostscommentsDelete = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);

    await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    const comments = await prisma.comment.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
    return res.send(comments);
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.commentsEdit = async (req, res) => {
  if (req.user) {
    const user = req.user;
    const token = req.token;
    const id = Number(req.body.id);
    await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        authorName: req.body.authorName,
        commentText: req.body.text,
        userId: req.user.user.id,
      },
    });
    return res.send({ message: 'Comment Edited', token, user });
  } else {
    return res.json({ message: 'jwt expired' });
  }
};
