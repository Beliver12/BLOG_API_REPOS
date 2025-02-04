const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();
const commentController = require('../controllers/commentController')

router.get('/', commentController.commentsGet);
router.get('/:commentId', commentController.commentGet);
  
  router.post('/', (req, res) => {
    const id = uuidv4();
    req.user
    const comment = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
    };
  
    req.context.models.comments[id] = comment;
  
    return res.send(comment);
  });
  
  router.delete('/:commentId', (req, res) => {
    const {
      [req.params.commentId]: comment,
      ...otherComments
    } = req.context.models.comments;
  
    req.context.models.messages = otherComments;
  
    return res.send(comment);
  });
  
  module.exports = router;