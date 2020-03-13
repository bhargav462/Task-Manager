const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try{
      
        const token = req.header('auth')
        console.log(token);
        const decoded = jwt.verify(token,'bhargav')
        console.log(decoded);
        const user = await User.findOne({_id:decoded._id, 'tokens.token' : token })
        console.log('authUser',user);
        if(!user){
            res.status(401).send()
        }
       
        req.user = user
        req.token = token
        next()

    }catch(e){
       res.status(400).send()
    }
}

module.exports = auth