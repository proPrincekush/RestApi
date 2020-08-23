const express = require("express");
const Ninja = require("../models/ninja")
const router = express.Router();


// get a list of n9inja from database
router.get("/ninja",(req,res,next)=>{

    Ninja.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(req.query.lat),parseFloat(req.query.lon) ] },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true                
            }
        }
    ]).then(function(err, ninjas, next){
        if (err) {
            res.send(err);
        }
        res.send(ninjas);
    }).catch(next);

})



// add a  n9inja to database
router.post("/ninja",(req,res,next)=>{
    console.log(req.body);
   Ninja.create(req.body)
   .then((ninja)=>{
       // send the saved ninja object
    res.send(ninja)
   })
   .catch(next)

})

// update list of n9inja  database
router.put("/ninja/:id",(req,res,next)=>{
    let Geo = {
        type:req.body.geometry.type,
        coordinates:req.body.geometry.coordinates
    }
    Ninja.findByIdAndUpdate({_id:req.params.id},{geometry:Geo})
    .then(()=>{
        Ninja.findOne({_id:req.params.id}).then(newNinja=>{
            res.send(newNinja);
        })      
    })
})


//delete a  n9inja from database
router.delete("/ninja/:id",(req,res,next)=>{
    Ninja.findByIdAndRemove({_id:req.params.id})
    .then((ninja)=>{
        res.send({ninja:ninja,type:"DELETE"});
    })
})

module.exports = router;