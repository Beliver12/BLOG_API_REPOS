const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/userController');
router.post('/login', async(req, res) => {
 const user = await prisma.user.findUnique({
     where: {
       username: req.body.username,
     },
   });
   if (!user) {
     return res.status(400).send({ error: 'Incorrect username' });
   }
   const match = await bcrypt.compare(req.body.password, user.password);
   if (!match) {
     return res.status(400).send({ error: 'Incorrect password' });
   }
   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
   jwt.sign(
     { user },
     process.env.ACCESS_TOKEN_SECRET,
     { expiresIn: '3600s' },
     (err, token) => {
       res.json({
         user,
         token,
         refreshToken,
         message: 'true',
       });
     }
   );
}); //tested

router.get('/', userController.usersGet); // tested
router.get(
  '/logedInUser',
  userController.verifyToken,
  userController.logedInGet
);// tested

router.post('/signup', userController.signupUserPost); //tested

module.exports = router;
