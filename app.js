//---------- General Setup ----------
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
//---------- General Setup End ----------

//---------- Mongoose Setup ----------
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://<username>:<password><clusternames>/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const itemSchema = {name: String}
const listsSchema = {name: String, items: [itemSchema]};
const List = mongoose.model("List", listsSchema);
mongoose.set('useFindAndModify', false);
//---------- Mongoose Setup End ----------


//---------- GET ----------
const items=["Read", "Cook", "Apply"];
const lists=["Main List", "Groceries List", "Homework List", "Books List"]

app.get("/", function(req, res){
  List.find({}, function(err, lists){
    if(!err){
      res.render("main", {lists: lists});
    }
  });
});

app.get("/:listId", function(req, res){
  const listId = _.capitalize(req.params.listId);
  List.findById(listId, function(err, doc){
    if(!err){
      const listName = doc.name;
      const listItems = doc.items;
      res.render("current", {currentListName: listName, items:listItems, listId: listId});
    }
  });
});


//---------- GET End ----------

//---------- POST ----------
app.post("/deleteItem", function(req, res){
  const deleteItemId = req.body.itemId;
  const listId = req.body.listId;
  List.findByIdAndUpdate(listId,
    {$pull: {items: {_id: deleteItemId}}},
    function(err){
      if (!err){
        console.log("Successfully deleted the item");
      }
    }
  );
  res.redirect("/"+listId);
});

app.post("/deleteList", function(req, res){
  const listId = req.body.listDeleteId;
  List.findByIdAndRemove(listId, function(err){
    if (!err){
      console.log("Successfully Deleted the List");
    };
  });
  res.redirect("/");
});

app.post("/", function(req, res){
  const body = req.body
  const newList = new List({name: body.newList, items: []});
  newList.save();
  res.redirect("/");
});

app.post("/:listId", function(req, res){
  const listId = _.capitalize(req.params.listId);
  const newItem = {name: req.body.newItem};
  List.findById(listId, function(err, doc){
    if(!err){
      const listItems = doc.items;
      listItems.push(newItem);
      doc.save();
      res.redirect("/" + listId);
    }
  });
});
//---------- POST End ----------
