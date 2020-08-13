var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX : show all campgrounds 
router.get("/", function(req,res){
    //get all campgrounds from db
    Campground.find({}, function(err,allcampgrounds){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds});
        }
    })
});

//CREATE: Add new campground
router.post("/", middleware.isLoggedIn , function(req,res){
    
    //get data from form and add data to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name ,price: price, image: image , description:desc, author: author};

    //create a new campground and save to DB
    Campground.create(newCampground, function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });  
});

//NEW: show form to create new campground
router.get("/new", middleware.isLoggedIn , function(req,res){
    res.render("campgrounds/new");
});

//SHOW: shows more info about one campground
router.get("/:id", function(req,res){
    //find the campground by provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
});

//edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership , function(req,res){
    Campground.findById(req.params.id , function(err, foundCampground){                     
                res.render("campgrounds/edit", {campground: foundCampground});                    
     }); 
    
});
//update campground route
router.put("/:id",middleware.checkCampgroundOwnership , function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err , updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
            return;
        }else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});
//destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership , function(req,res){
    Campground.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
}); 

module.exports = router;