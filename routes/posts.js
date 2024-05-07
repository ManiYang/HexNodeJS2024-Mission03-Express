var express = require('express');
var router = express.Router();
const Post = require('../model/posts');
const { handleRequestBodyForPost } = require('../middlewares')

router.get('/', async (req, res, next) => {
    const posts = await Post.find({});
    res.status(200).json({
        status: 'success',
        data: posts
    });
});

router.delete('/', async (req, res, next) => {
    const result = await Post.deleteMany({});
    res.status(200).json({
        status: 'success',
        data: result
    })
});

module.exports = router;
