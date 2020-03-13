const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt=  require('jsonwebtoken');

const userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type:String
    },
    tokens:[{
        token:{
            type : String,
            required:true,
            expiresIn : "1d"
        }
    }]
})

userSchema.pre('save',async function(next){
  
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8);
    }

})

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'bhargav')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

module.exports = mongoose.model("User",userSchema);