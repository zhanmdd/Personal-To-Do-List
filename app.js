//---------- General Setup ----------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
  console.log("The server is running on server 3000");
});
//---------- General Setup End----------

//---------- GET ----------
app.get("/", function(req, res){
  res.render("current");
});
//---------- GET End----------
