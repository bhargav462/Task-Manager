const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Badminton = require('../models/badminton')
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

router.post('/badminton/users',auth,(req,res) => {
    User.find({},'username',(err,result) => {
        result = result.filter((element) => {
            return element.username !== req.user.username
        })
        res.send(result);
    })
})

router.post('/badminton/match',auth,async (req,res) => {
    console.log('badminton/match');
    var badminton = new Badminton();
    badminton.me = req.body.me;
    badminton.opponent = req.body.opponent;
    badminton.result = req.body.Won;
    try{
      await badminton.save();
      res.send();
    }catch(e){
      res.status(404).send();
    }

})

router.post('/badminton/results',auth,async (req,res) => {
    console.log('results')
    Badminton.find({'me':req.user.username}).then((result2) => {
        console.log(result2);
       Badminton.find({'opponent':req.user.username}).then((result1) => {
           result1 = result1.filter((element) => {
              element.opponent = element.me;
              if(element.result){
                  element.result = false
              }else{
                  element.result = true
              }
              return element
           })
           
        //    console.log('result1',result1);
            if(result1.length > 1){
                console.log('check1',result1)
                result1.concat(result2);
                res.send(result1);
            }else{
                console.log('check2)')
                result2.concat(result1);
                res.send(result2)
            }
            
           
        //    console.log('resilt',result2)
       })
       
    }).catch(e => {
        res.status(404).send();
    })
})

module.exports = router