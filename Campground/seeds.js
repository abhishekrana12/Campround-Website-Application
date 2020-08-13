var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment")

var data= [
    {
        name:"Huts at Shimla" , 
        image: "https://r-cf.bstatic.com/images/hotel/max1024x768/230/230057484.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:" LivingStone Ojuven Treehouses" ,
        image: "https://q-cf.bstatic.com/images/hotel/max1024x768/203/203630782.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."  
    },
    {
        name:"PineHills Nature Camp" ,
        image: "https://q-cf.bstatic.com/images/hotel/max1024x768/199/199825181.jpg",
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
    }
]
    
function seedDB(){
        //remove all campgrounds
        Campground.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("removed campgrounds");
                //add few campgrounds
                data.forEach(function(seed){
                     Campground.create(seed, function(err,campground){
                         if(err){
                             console.log(err);
                         }else{
                             console.log("added campground");
                             //create a comment
                             Comment.create(
                                 {
                                     text:"This place is great!",
                                     author:"Mukul"
                                 }, function(err, comment){
                                     if(err){
                                         console.log(err)
                                     }else{
                                         campground.comments.push(comment);
                                         campground.save();
                                         console.log("Created a comment")
                                     }
                                 });
                         }
                     });
                 })
            }
        });
}

module.exports = seedDB;