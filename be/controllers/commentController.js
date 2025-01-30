const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.commentsGet = async (req, res) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorName: 'comment'
        }
    })
    return res.send(comments[0]);
}

exports.commentGet = async (req, res) => {
    const id = Number(req.params.commentId);
    const comment = await prisma.comment.findUnique({
        where: {
            id: id
        }
    })
    return res.send(comment)
}