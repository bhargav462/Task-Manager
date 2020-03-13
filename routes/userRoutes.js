const express = require('express');
const router = express.Router();
const User = require('../models/user');
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

router.post('/register',async (req,res) => {
    const user = _.pick(req.body,['name','email','password']);
    console.log('user',user);
    
    const newUser = new User(user);
    newUser.save().then((result) => {
        console.log('saved suucessfully');
        // res.sendFile('login.html',{root:__dirname + '/../public'})
        // res.sendFile('login.html',{root:__dirname + '/../public'})
        // res.render('login.hbs');
        res.status(200).send(result);
    }).catch((e) => {
        console.log(e);
        res.send('validation error');
    })
   
});

router.post('/login',async function (req,res) {

   try{

    const user = await User.findOne({email:req.body.email})

    if(!user){
      return  res.status(400).send();
    }
   
    const isMatch = await bcrypt.compare(req.body.password,user.password);

    if(isMatch){
        console.log('user',user);
        const token = await user.generateAuthToken();
        console.log(token);
        res.send(token);
    }else{
        res.status(400).send();
    }

   }catch(e){
       res.status(400).send();
   }
    
});

router.post('/login/check',auth,async function(req,res){
   try{
       console.log('/login/check',req.user.name);
        res.send(req.user.name)
   } catch(e){
       res.status(400).send()
   }
    
})

router.get('/login',async (req,res) => {
    res.sendFile('login.html',{root:__dirname + '/../public'})
})

router.post('/logout',auth,async function(req,res){
    console.log(req.body);
    console.log(req.header('auth'))
   try{
         
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send('Logged out successfully')
        
   } catch (e) {
       res.status(400).send();
   }
    
})

module.exports = router;