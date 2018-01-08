const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const engine=require('ejs-locals');
var multer  = require('multer');

//set up multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ storage: storage })
//bring in models
var Room=require("./Models/room");
var User=require("./Models/user");
var Iheader=require("./Models/Iheader");
var I2=require("./Models/I2");
var feedback= require("./Models/feedback");
var Itab=require("./Models/Itab");
var booking=require("./Models/booking");
var section=require("./Models/section");
var news=require("./Models/news");

//set up database
mongoose.connect("mongodb://localhost/hostel",function(err){
 if (err) {
    console.log(err) 
 }else{
     console.log("database connected");
 }

});
 var db=mongoose.connection;
//initialize app
var app=express();
app.use(express.static(__dirname+'/public'));
//settings
app.engine('ejs',engine);

//set view engine and views folder
app.set('view engine','ejs');
app.set('views',__dirname+'/views');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//end of middleware 

//routes
app.get("/",(req,res)=>{


Iheader.find((err, header)=>{
  if (err) return console.error(err);
 var nth= header.length-1;
var item=header[nth];
 console.log(header);

 var I2Item={};
I2.find((err, items)=>{
if(err)return console.error(err);
var nth=items.length-1;
I2Item=items[nth];
console.log(" here is the info you want=>"+I2Item);
res.render('index.ejs',{line1:item.line1,line2:item.line2,src:item.src,H2:I2Item});

})
 

 })
 

});
app.post('/upload', upload.single('img'), function (req, res, next) {
  // req.file is the `avatar` file

  var name=req.body.name;
  var price=req.body.price;
  var beds=req.body.beds;
  var status=req.body.status;
  var  src=req.file.originalname;
  var rating=req.body.rating;
  var complements=req.body.complements;

  var room=new Room({name:name, price:price, beds:beds,status:status,rating:rating,complements:complements,img:src});
  room.save();
  res.render("dash.ejs");
  
  // req.body will hold the text fields, if there were any
})
app.post('/header', upload.single('img'), function (req, res, next) {
  // req.file is the `avatar` file

 
  var line1=req.body.line1;
  var line2=req.body.line2;
  var  src=req.file.originalname;
  

  var room=new Iheader({line1:line1,line2:line2,src:src});
  room.save();
  console.log("Iheader updated");
  res.render("dash.ejs");

  
  // req.body will hold the text fields, if there were any
});
app.post('/h2', upload.single('img'), function (req, res, next) {
  // req.file is the `avatar` file
  var title=req.body.title;
  var details=req.body.details;
    

  var welcomeinfo=new I2({title:title,details:details});
  welcomeinfo.save();
  console.log("welcome info changed");
  res.render("dash.ejs");

  
  // req.body will hold the text fields, if there were any
});
app.get("/dash",(req,res)=>{
    res.render('dash.ejs');

});
app.get('/acc',function(req,res){
res.render('acc.ejs')

});
app.get('/gallery',function(req,res){
res.render('galla.ejs')

});
app.get('/about',function(req,res){
res.render('about.ejs')

});
app.get('/book',function(req,res){
res.render('booking.ejs')

});
app.get('/details',function(req,res){
res.render('details.ejs')

});
app.get('/blog',function(req,res){
res.render('blog.ejs')

});
app.get('/contact',function(req,res){
res.render('contact.ejs')

});
app.get('/search',function(req,res){
res.render('search.ejs')

});
//end routes

//Start listening for requests
app.listen(3000,function(){
    
 console.log("app runinng at  p 8000");
 
});

