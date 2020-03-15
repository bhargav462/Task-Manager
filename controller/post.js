const Post = require('../models/post');
const mongoose = require('mongoose');
const sharp = require('sharp');

exports.createPost = (async (req,res) => {
  console.log('post creation');
  console.log(req.file);
  const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer();
    console.log(req.body);
  console.log('new Post');
  var post = new Post();
  post.userPost = buffer;    
  post.userId = req.user._id;
  post.comment = req.body.comment
  post.save().then(post => {
      console.log('Saved Successfully');
      res.send('alert(\'BHargav\')');
  });
});

exports.userPosts = ((req,res) => {
  console.log('userPosts',req.user);
  Post.find({userId:req.user._id},'_id comment date',(err,result) => {
    console.log('userPosts');
    console.log(result);
    result.reverse();
    res.send(result);
  })
  
});

exports.getPost = ((req,res) => {
  console.log(req.params)
  Post.findOne({'_id':req.params.id},(err,result) => {
    if(result)
    {
      console.log(result);
      res.set('Content-Type','image/png');
      res.send(result.userPost);
    }else{
      console.log('No data was found');
      res.send();
    }
    
  });
})

