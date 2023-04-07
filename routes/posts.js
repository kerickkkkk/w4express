var express = require('express');
var router = express.Router();
const Post = require('../models/postModel.js')

/* GET users listing. */
router.get('/posts', async (req, res, next) => {
  try {
    // 篩選功能
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const posts = await Post.find(q)
      .populate({
        path: 'user',
        select:'name'
      }).sort(timeSort);
    res.send({
      success : true,
      data : posts
    });
  } catch (error) {
    console.log(error)
  }
});


router.post('/post', async (req, res, next) =>{
  const { content, user } = req.body
  try {
    const newPost = await Post.create({
      user,
      content
    })
    res.send({
      success : true,
      data : newPost
    });
  } catch (error) {
    console.log(error)
  }
});

module.exports = router;
