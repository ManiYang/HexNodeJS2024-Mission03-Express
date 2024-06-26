var express = require('express');
var router = express.Router();
const Post = require('../model/posts');
const { handleRequestBodyForPost } = require('../middlewares')

router.post('/', handleRequestBodyForPost, async (req, res, next) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json({
            status: 'success',
            data: newPost
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Post.findByIdAndDelete(req.params.id);
        if (result === null) {
            throw new Error('找不到指定 ID 的貼文');
        }
        res.status(200).json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    }
});

router.patch('/:id', handleRequestBodyForPost, async (req, res, next) => {
    try {
        if (req.body.content === undefined) {
            throw new Error("content 欄位未填寫");
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (updatedPost === null) {
            throw new Error("找不到指定 ID 的貼文");
        }
        res.status(200).json({
            status: 'success',
            data: updatedPost
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: error.message
        });
    } 
});

module.exports = router;
