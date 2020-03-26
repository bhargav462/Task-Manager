const express = require('express');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')
const User = require('../models/user');
const Novel = require('../models/novel');

const router = express.Router();


router.post('/novels/addbook',auth,async (req,res) => {
    
    try {
        var novel = new Novel();
        novel.userId = req.user._id;
    novel.bookName = req.body.inputNovel;
            await novel.save()
    } catch (error) {
        res.status(500).send();
    }
    res.send();
})

router.post('/novels/getbooks',auth,async (req,res) => {
  try {
     var novels = await Novel.find({userId : req.user._id},'bookName')
     res.send(novels);
  } catch (error) {
      res.status(400).send();
  } 
})

module.exports = router