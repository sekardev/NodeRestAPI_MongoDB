var morgan = require('morgan')
var bodyParser = require('body-parser')
var compression = require('compression')
var constants = require('./constants')
var helmet = require('helmet')
var cors = require('cors')
var jwt = require('jsonwebtoken');
const isDev = process.env.NODE_ENV === 'development';
 const isProd = process.env.NODE_ENV === 'production';
 const User = require('../model/user.model')


 module.exports =  app => {
    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    if (isDev) {
        app.use(morgan('dev'));
    }
};

module.exports.tokenValidation = (req,res,next)=>{

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    
    if (token) {
    // verifies secret and checks exp
    jwt.verify(token, constants.secret, function(err, decoded) {      
        if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        if(decoded.username){            
        User.findOne({Username:decoded.username}, function (err, user) {
            if (err) {errorHandler(res,"Error Occured");}
            if (!user) {errorHandler(res,"Error Occured");}
            next();  
        })            
        }
        else  errorHandler(res,"Error Occured");
        }
    });
    } else  errorHandler(res,"No token provided.");
    }

    function errorHandler(res, msg){
        return res.status(403).send({ 
            success: false, 
            message: msg 
        });
    }