const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = Router();
const userController = require('../controllers/userController');
router.post('/login', (req, res) => {
  if (!req.body.username && !req.body.password) {
    res.status(400).json('you need to pass username and password');
    return;
  }
  const username = req.body.username;
  const password = req.body.password;
  res.status(201).json({ username, password });
}); //tested

router.get('/', userController.usersGet); // tested
router.get(
  '/logedInUser',
  userController.verifyToken,
  userController.logedInGet
);// tested

router.post('/signup', userController.signupUserPost); //tested

module.exports = router;
