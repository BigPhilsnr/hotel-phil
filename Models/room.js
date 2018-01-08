var mongoose=require('mongoose');

var RoomSchema=mongoose.Schema({
name:{
    type:String, required:true
},
beds:{
    type:Number, required:true
},
rating:{
    type:Number, required:true
},

price:{
    type:Number,required:true
},
img:{
type:String, required:true
},
status:{type:String, required:true},
complements:{type:String}

});
var Room=module.exports=mongoose.model('Room',RoomSchema);