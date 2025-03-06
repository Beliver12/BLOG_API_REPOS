const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();
const commentController = require('../controllers/commentController');

router.get('/', commentController.commentsGet);
router.post(
  '/create',
  commentController.verifyToken,
  commentController.commentsPost
);
router.delete(
  '/delete',
  commentController.verifyToken,
  commentController.commentsDelete
);
router.post(
  '/comment',
  commentController.verifyToken,
  commentController.commentGet
);
router.put(
  '/edit',
  commentController.verifyToken,
  commentController.commentsEdit
);
router.delete(
  '/mypostsdelete',
  commentController.verifyToken,
  commentController.myPostscommentsDelete
);

module.exports = router;
