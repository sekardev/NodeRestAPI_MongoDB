const User = require('../model/user.model')
const constants = require('../config/constants')
const jwt = require('jsonwebtoken');


//Simple version, without validation or sanitation
exports.users = function (req, res) {
    User.find({}, function (err, users) {
        if (err) res.send(err);
        res.send(users);
    })
    
};
exports.user_login = function (req, res) {

    User.findOne({ Username : req.body.username ,
        Password :  req.body.password}, function (err, user) {
        if (err) res.send(err);
        if (!user) {errorHandler(res,"Error Occured");}
        else {
        // create a token
        var token = jwt.sign({ username: user.Username }, constants.secret, {
        expiresIn: 3600 // expires in 1 hour
      });
        res.status(200).send({ auth: true, token: token , expiryminutes:60 });        
        }
    })    
};



exports.user_details = function (req, res) {
    findUser(req.params.id,res);    
};
exports.user_update = function (req, res) {

    let user =
        {            
            Username : req.body.email ,
            Password :  req.body.password,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            EmailAddress : req.body.email,
            Gender : req.body.gender,
            DOB : req.body.dob,
            Phone : req.body.phone,            
            CurrentAddress :{
                Street : req.body.CurrentAddress.street,
                City:req.body.CurrentAddress.city,
                State:req.body.CurrentAddress.state,
                Zipcode : req.body.CurrentAddress.zipcode
            },
            EmergencyContact:{
                FirstName : req.body.emergencycontact.firstname,
                LastName : req.body.emergencycontact.lastname,
                Phone : req.body.emergencycontact.phone
            },
            Insurance : {
                ProviderName: req.body.Insurance.providername,
                PlanDetails : {
                    PolicyName : req.body.Insurance.planDetails.policyname ,
                    PolicyId : req.body.Insurance.planDetails.policyid
                }
            },
            IsProfileCompleted : req.body.isprofilecompleted,
            IsEmailVerified : req.body.isemailverified
        };
    
      User.findOneAndUpdate({_id: req.params.id}, user, function(err, user) {
        if (err) 
          res.send(err);        
        if (!user) {errorHandler(res,"User Not Found");}
        else {       
        findUser(req.params.id,res);
        }
      });
   
};

exports.user_delete = function (req, res) {
    User.findOneAndDelete(req.params.id, function (err, user) {
        if (err) res.send(err);
        if (!user) {errorHandler(res,"User Not Found");}
        else {
        res.send('Deleted successfully!');}
    })
};

exports.user_create = function (req, res) {
    let user = new User(
        {
            Username : req.body.email ,
            Password :  req.body.password,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            EmailAddress : req.body.email,
            Gender : req.body.gender,
            DOB : req.body.dob,
            Phone : req.body.phone
        }
    );
    user.save(function (err) {
        if (err) {
            if(err.code === 11000)
            {      
                errorHandler(res, "Email already exist")        ;
            }else {
            res.send(err)
            }
        }
        else {
           findUser(user.id,res);
    }       
    })
};

async function findUser(id,res){
    await User.findById(id, function (err, inserteduser) {
        if (err) {res.send(err);} else {
            return res.status(200).send({ 
                success: true,                
                user : inserteduser
            });
        }
    })
}

function errorHandler(res, msg){
    return res.status(403).send({ 
        success: false, 
        message: msg 
    });
}