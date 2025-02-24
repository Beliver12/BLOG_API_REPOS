const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();
const commentController = require('../controllers/commentController')


router.get('/', commentController.commentsGet);
router.post('/create', commentController.commentsPost)

  module.exports = router;