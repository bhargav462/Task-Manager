const env = process.env.NODE_ENV || 'development';

// if(env === 'production'){
//     console.log('Heroku app');
//     process.env.MONGODB_URI = "mongodb+srv://n462:n462@mycluster-ebxbe.mongodb.net/task?retryWrites=true&w=majority"
// }else if(env === 'development'){
//     console.log('development');
//     process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/chess"
// }

if(env === 'production' || env === 'development'){
    var config = require('./config.json');
    var envConfig = config[env];
    console.log(envConfig)
    Object.keys(envConfig).forEach((key) =>{
        process.env[key] = envConfig[key];
    })
}

module.exports = {config:env}