const express = require('express'),
  router = express.Router(),
  Post = require('../models/Post');

// Routes

// Get All Post
router.get('/', async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

// Get Post By Id
router.get('/:id', async (req, res) => {
  //   console.log(req.params.id);
  try {
    const getPostById = await Post.findById(req.params.id);
    res.json(getPostById);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

// Update Post By Id
router.patch('/:id', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      { $set: { 
          title: req.body.title,
          description: req.body.description 
        } }
    );
    res.json(updatePost);
  } catch (err) {
    res.json(err);
  }
});

// Delete Post By Id
router.delete('/:id', async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.id });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Submit Post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.json({
      message: err,
    });
  }
  
});

module.exports = router;
