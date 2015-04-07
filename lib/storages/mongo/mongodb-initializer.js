module.exports = function(){
    
    var mongoose = require('mongoose');

    var uristring =
        process.env.MONGOLAB_URI
        || process.env.MONGOHQ_URL
        || 'mongodb://localhost/restaurant-roulette';
    
    mongoose.connect(uristring);
    
    var mongoStorage = require("lib/storages/mongo/mongo-storage.js");
    
    // TODO : Run over all the mongo-model library
    require("lib/storages/mongo/restaurants-model.js")(mongoose, mongoStorage);
}