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

router.post('/', handleRequestBodyForPost, async (req, res, next) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newPost
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            message: error.message
        });
    }
});

module.exports = router;
