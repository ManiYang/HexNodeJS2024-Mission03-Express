var express = require('express');
var router = express.Router();
const Post = require('../model/posts');

router.get('/', async (req, res, next) => {
    const posts = await Post.find({});
    res.status(200).json({
        status: 'success',
        data: posts
    });
});



module.exports = router;
