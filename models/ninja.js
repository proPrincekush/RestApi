const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//  GeoJson Schema for Ninjas
const GeoJsonSchema = new Schema({
    type: {
        type:String,
        default:"Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})

/// Schema for Ninjas
const NinjaSchema = new Schema({
    name:{type:String,required:[true,"Name field is required."]},
    rank:{type:String},
    available:{type:Boolean,default:false},
    geometry:GeoJsonSchema
});

const Ninja = mongoose.model("ninja",NinjaSchema);

module.exports = Ninja;