const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

exports.userSignUpPost = async (req, res, next) => {
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
        res.render("index");

    });
}