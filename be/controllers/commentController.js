const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.commentsGet = async (req, res) => {
    const id = Number(req.body.id)
    const comments = await prisma.comment.findMany({
        orderBy: [
          {
           id: 'asc'
          }
       ],
      })
      return res.send(comments);
}

exports.commentsPost = async (req, res) => {
    const id = Number(req.body.id)
    await prisma.comment.create({
        data: {
            commentText: req.body.text,
            authorName: req.body.authorName,
            postId:  id
        }
      })
      return res.send({message: 'comment created'});
}