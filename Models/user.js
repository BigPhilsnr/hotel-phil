var mongoose=require('mongoose');

var UserSchema=mongoose.Schema({
firstname:{type:String, required:true},
lastname:{type:String,required:true},
email:{type:String,required:true},
password:{type:String, required:true},
idNo:{type:String, required:true}

});
var User=module.exports=mongoose.model('User',UserSchema);
