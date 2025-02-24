const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');


const router = Router();
const postController =  require('../controllers/postController')

router.get('/',  postController.postsGet);
router.delete('/delete', postController.mypostsDelete)
router.put('/publish', postController.mypostsPubslih)
router.post('/create',  postController.postPost) 
router.post('/myposts',  postController.mypostsPost)
router.post('/post', postController.postGet)
router.put('/edit', postController.mypostsEdit)


/*router.delete('/:postId', (req, res) => {
  const {
    [req.params.postId]: post,
    ...otherPosts
  } = req.context.models.posts;

  req.context.models.posts = otherPosts;

  return res.send(post);
});*/

module.exports = router;