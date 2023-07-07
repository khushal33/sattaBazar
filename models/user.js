const mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    role:{type:String,required:true,enum:['admin','user']},
    branchName:{type:String,required:true,enum:['admin','natepute','akluj']},
    password:{type:String,required:true}
})

// hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User