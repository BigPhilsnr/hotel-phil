var mongoose=require('mongoose');

var feedbackSchema=mongoose.Schema({

name:{type:String, required:true}, 
src:{type:String,required:true},
feedback:{type:String, required:true},
site:{type:String, required:true}

});
var Feedback=module.exports=mongoose.model('Feedback',feedbackSchema);
