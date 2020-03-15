const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();

const postController = require('../controller/post');

const multer = require('multer');
const upload = multer({
    limits:{
        fileSize: 40000000
    }
})


router.post('/createPost',auth,upload.single('chessPic'),postController.createPost);

router.post('/userPosts',auth,postController.userPosts);

router.get('/chess/:id',postController.getPost);

module.exports = router;