//---------- General Setup ----------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function(){
  console.log("The server is running on server 3000");
});
//---------- General Setup End ----------

//---------- Mongoose Setup ----------
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/toDoListDB", { useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = {name: String}
const listsSchema = {name: String, items: [itemSchema]};
const List = mongoose.model("List", listsSchema);
//---------- Mongoose Setup End ----------


//---------- GET ----------
const items=["Read", "Cook", "Apply"];
const lists=["Main List", "Groceries List", "Homework List", "Books List"]

app.get("/", function(req, res){
  List.find({}, function(err, lists){
    if(!err){
      res.render("current", {lists: lists, items:items});
    }
  });
});

app.get("/:customList", function(req, res){
  const customListName = _.capitalize(req.params.customList);
  console.log(customListName);
});


//---------- GET End ----------

//---------- POST ----------
app.post("/", function(req, res){
  const body = req.body
  if(body.newItem){
    const newItem = {name: body.newItem};
  }else if(body.newList){
    const newList = new List({name: body.newList, items: []});
    newList.save();
  }
  res.redirect("/");
});
//---------- POST End ----------
