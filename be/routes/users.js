const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = Router();
const userController = require('../controllers/userController')


router.get('/', userController.usersGet);
router.get('/:userId', userController.userGet);
router.post('/signup', userController.signupUserPost)

  
module.exports = router;