module.exports = function(app) {
    
    app.get("/restaurants/get", function(requests, response) {
        
        var restaurantsProvider = require('lib/services/restaurants-provider.js')();
        
        restaurantsProvider.get().then(function(restaurants) {
            response.json(restaurants);
        });
    });
    
}