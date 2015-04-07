module.exports = function(app) {
    
    app.get("/restaurants/get", function(requests, response) {
        
//        var clickattable = require('lib/services/clickatable-wrapper.js')();
//
//        clickattable.get()
//            .then(function(result){
//                
//            var restaurants = [];
//
//            // Get all the restaurant from the DB
//            var mongoStorage = require("lib/storages/mongo/mongo-storage.js");
//
//            var RestaurantsModel =  mongoStorage.Models.Restaurants;
//        
//            RestaurantsModel.where('externalId').in(select(result, function(item){return item.externlId;}).exec(function(err, restaurants){
//                
//                // Set the images
//                join(result, restaurants, function(outerItem){return outerItem.name;}, function(innerItem){return innerItem.name;}, function(outerItem, innerItem){
//                    outerItem.image = innerItem.image;
//                });
//            
//            });
//            
            
            // Insert into the DB the missing restaurants
            
//                var restaurantsStorage = require("mongo-storage");
//            
//                var restaurant = new Restaurant();
//                
//                restaurantsStorage.save(restaurant);
//                
//                response.json(result);
        });
//    });
    
    
    var where = function*(enumerable, predicate){
    
        for (var item of enumerable)
        {
            if (predicate(item))
                yield item;
        }
      
        
    };
    
    app.get("/test", function(request, response) {
    
        var arr = [1,2,3,4,5];
    
        var x = where(arr, function(item){return item < 4;});
        
        for (var item of x)
        {
            console.log(item);
        }
//        console.log(x.next());
//                console.log(x.next());
//
//                console.log(x.next());
//                console.log(x.next());
//                console.log(x.next());
//                console.log(x.next());
//                console.log(x.next());

        // var iterator = where(arr, function(item){return item < 4}).join(",");
        
        response.end(iterator);
        
//        var mongoStorage = require("lib/storages/mongo/mongo-storage.js");
//
//        var Restaurants =  mongoStorage.Models.Restaurants;
//        
//        Restaurants.where('externalId').in([1]).exec(function(err, docs){
//
//            
//            
//                    response.end(docs[0].name);
//            
//        });
        
    
    });
    
    var select = function(enumerable, selector) {
    
        var array = [];
        
        for (var item in enumerable)
        {
            array.push(selector(item));    
        }
    
    };
    
    var joinDo = function(outers, inners, outerSelector,innerSelector, returnSelector) {
        
        var enumerable = [];
        
        for (var outerItem in outers)
        {
            for (var innerItem in inners)
            {
                if (outerSelector(outerItem) == innerSelector(innerItem))
                {
                    enumerable.push(returnSelector(outerItem,innerItem));
                }
            }
        }
        
        return enumerable;
    };
        
        
//    var minus = function(outers, inners, outerSelector,innerSelector) {
//        
//        var enumerable = [];
//        
//        for (var outerItem in outers)
//        {
//            var found = false;
//            
//            for (var innerItem in inners)
//            {
//                if (outerSelector(outerItem) == innerSelector(innerItem)) {
//                    found = true;
//                    break;;
//                }
//            }
//            
//            if (found =
//        }
//        
//        return enumerable;
//    }
    

}