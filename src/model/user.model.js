const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   
        Username: { type: String, unique: true },
        Password: { type: String, required: true },
        FirstName: {
            type: String, required: true
        },
        LastName: {
            type: String, required: true
        }, 
        DOB: {
            type: Date, required: true
        }, 
        Gender: {
            type: String, required: true
        }, 

        EmailAddress: {
            type: String,unique: true, required: true
        },
        CurrentAddress: {            
            Street : String,
            City : String,
            State : String,
            Zipcode : String
        },
        Phone : {type : String , required:true},
        EmergencyContact : {FirstName : String , LastName : String , Phone:String
        },
        Insurance : {
            ProviderName: String,
            PlanDetails : {
                PolicyName : String , PolicyId : String
            }
        },
        IsEmailVerified : {type:Boolean, default: false },
        IsProfileCompleted : {type:Boolean, default: false },
        CreatedDate: { type: Date, default: Date.now }, 
        UpdatedDate: { type: Date, default: Date.now }
    })

// Export the model
module.exports = mongoose.model('User', userSchema);