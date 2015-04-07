module.exports = function(){
    
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/restaurant-roulette');
    
    var mongoStorage = require("lib/storages/mongo/mongo-storage.js");
    
    // TODO : Run over all the mongo-model library
    require("lib/storages/mongo/restaurants-model.js")(mongoose, mongoStorage);
}