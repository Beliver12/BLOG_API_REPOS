const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = Router();

const signupController = require('../controllers/signupController')

router.get('/', signupController.userSignUpPost)

module.exports = router;