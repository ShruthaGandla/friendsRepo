let express = require("express");
let app = express();
const path = require("path");
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Define the Static Folder:

app.use(express.static(__dirname + '/public/dist'));
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/friends');
mongoose.Promise = global.Promise;

var friendsSchema = new mongoose.Schema({
  firstName: {type: String, required: true, minlength: 2},
  lastName: {type: String, required: true, minlength: 2},
  bday: {type: Date, required: true},
}, {timestamps: true});

mongoose.model('Friend', friendsSchema);
var Friend = mongoose.model('Friend');

// Here we're hardcoding data for simplicity, but normally this would be modularized and the data would be coming from your database.
//var friends = [{name: "Kermit", color: "green"}, {name: "Miss Piggy", color: "pink"}, {name: "Gonzo", color: "blue"}];

// Routes could be modularized, but for now we'll put it here
// You can use your fat arrow functions if you like!
app.get('/friends', function(req, res){
  Friend.find({}, function (err, friends){
    if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",friends:friends});
    }
    
  });//find ends
});//get ends


//process route
app.post('/createFriend', function(req, res){
  Friend.create(req.body,function(err,output){
   if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",friend:output});
    }
  
  });//create ends
});//post ends

app.post('/editFriend/:id', function(req, res){
  Friend.update({_id: req.params.id}, req.body, function(err,output){
    if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",friend:output});
    }

   });//update ends
 });//post ends


app.get('/delete/:id', function(req, res){ 
   Friend.remove({_id:req.params.id}, function (err) {
      if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success"});
      
    }

   });
 });


 app.get('/showFriend/:id', function(req, res){

    Friend.findOne({_id: req.params.id} , function(err, theFriend){
      if(err){
      res.json({message:"error",error:err});
    }
    else{
      res.json({message:"success",friend:theFriend});
    }

    });//findOne ends
  });//get ends


app.get('*', function(req, res){
    res.sendFile(path.resolve('public/dist/index.html'));
})

app.listen(8000);
