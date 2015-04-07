module.exports = function() {

    return {
        get: function() {
            
            var Promise = require('promise');

            return new Promise(function(fulfill, reject) {

                var clickattable = require('lib/services/clickatable-wrapper.js')();

                clickattable.get().then(function(clickatableRestaurants) {

                    var externalIds = clickatableRestaurants.map(x => x.name);

                    var restaurantsMongoStorage = require("lib/storages/mongo/restaurants-mongo-storage.js")();

                    restaurantsMongoStorage.getByExternalIds(externalIds).then(function(restaurants) {

                        // TODO : Write to log the missing restaurants
                        var missingRestaurants = clickatableRestaurants.minus(restaurants, x=>x.name, x=>x.name);
                        
                        console.error({missingRestaurants:  missingRestaurants});

                        fulfill(restaurants);
                    });
                    
                });
            });
        }
    }
}
