const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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