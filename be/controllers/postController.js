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

exports.postsGet = async (req, res) => {
  const id = Number(req.body.id);
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
    where: {
      published: 'true',
      userId: id,
    },
  });
  return res.send(posts);
};

exports.postGet = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return res.send(post);
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.mypostsPubslih = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (post.published === 'false') {
      await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          published: 'true',
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          published: 'false',
        },
      });
    }
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
      where: {
        userId: req.user.user.id,
      },
    });
    return res.send(posts);
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.mypostsDelete = async (req, res) => {
  if (req.user) {
    const id = Number(req.body.id);

    await prisma.comment.deleteMany({
      where: {
        postId: id,
      },
    });
    await prisma.post.delete({
      where: {
        id: id,
      },
    });

    const posts = await prisma.post.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
      where: {
        userId: req.user.user.id,
      },
    });
    return res.send(posts);
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.mypostsEdit = async (req, res) => {
  if (req.user) {
    const user = req.user;
    const token = req.token;
    const publish = JSON.stringify(req.body.publish);
    const id = Number(req.body.id);
    await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        postName: req.body.postname,
        postText: req.body.text,
        published: publish,
        userId: req.user.user.id,
      },
    });
    return res.send({ message: 'Post Edited', token, user });
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.mypostsPost = async (req, res) => {
  if (req.user) {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
      where: {
        userId: req.user.user.id,
      },
    });
    return res.send(posts);
  } else {
    return res.json({ message: 'jwt expired' });
  }
};

exports.postPost = async (req, res, next) => {
  if (req.user) {
    const user = req.user;
    const token = req.token;
    const publish = JSON.stringify(req.body.publish);
    await prisma.post.create({
      data: {
        postName: req.body.postname,
        postText: req.body.text,
        published: publish,
        createdBy: req.user.user.username,
        userId: req.user.user.id,
      },
    });

    return res.send({ message: 'Created Post', token, user });
  } else {
    return res.sendStatus(400).json({ message: 'jwt expired' });
  }
};
