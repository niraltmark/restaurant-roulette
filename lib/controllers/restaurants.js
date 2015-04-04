module.exports = function(app) {
    
    app.get("/restaurants/get", function(requests, response) {
        
        var clickattable = require('lib/services/clickatable-wrapper.js')();

        response.end(clickattable.get());
    });
    
}