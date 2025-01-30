const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();
const postController =  require('../controllers/postController')

router.get('/', postController.postsGet);
router.get('/:postId', postController.postGet);


router.post('/', (req, res) => {
  const id = uuidv4();
  const post = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.posts[id] = post;

  return res.send(post);
});

router.delete('/:postId', (req, res) => {
  const {
    [req.params.postId]: post,
    ...otherPosts
  } = req.context.models.posts;

  req.context.models.posts = otherPosts;

  return res.send(post);
});

module.exports = router;