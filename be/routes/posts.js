const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();
const postController = require('../controllers/postController');

router.post('/', postController.postsGet);
router.delete(
  '/delete',
  postController.verifyToken,
  postController.mypostsDelete
);
router.put(
  '/publish',
  postController.verifyToken,
  postController.mypostsPubslih
);
router.post('/create', postController.verifyToken, postController.postPost);
router.post('/myposts', postController.verifyToken, postController.mypostsPost);
router.post('/post', postController.verifyToken, postController.postGet);
router.put('/edit', postController.verifyToken, postController.mypostsEdit);

module.exports = router;
