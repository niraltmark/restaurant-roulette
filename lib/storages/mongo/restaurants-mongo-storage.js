module.exports = function() {

    return {
    
        getByExternalIds: function(externalIds) {
        
            var Promise = require('promise');

            return new Promise(function(fulfill, reject) {
               
                var mongoStorage = require("lib/storages/mongo/mongo-storage.js");

                var RestaurantsModel = mongoStorage.Models.Restaurants;

                RestaurantsModel.where('name').in(externalIds).exec(function(err, restaurants) { 

                    fulfill(restaurants);

                });
            });
        }
    };
}