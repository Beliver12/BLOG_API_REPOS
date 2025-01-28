const { v4: uuidv4 } = require('uuid');
const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.comments));
  });
  
  router.get('/:commentId', (req, res) => {
    return res.send(req.context.models.comments[req.params.commentId]);
  });
  
  router.post('/', (req, res) => {
    const id = uuidv4();
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