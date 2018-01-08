var mongoose=require('mongoose');
var ItabSchema=mongoose.Schema({
src:{type:String, required:true},
name:{type:String, required:true},
header1:{type:String, required:true},
header2:{type:String, required:true},
content:{type:String, required:true},
footer1:{type:String, required:true},
footer2:{type:String, required:true}

});

var Itab=module.exports=mongoose.model("Itab",ItabSchema);