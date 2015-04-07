module.exports = function(mongoose, mongoStorage){
    
    var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

    var RestaurantSchema = new Schema({
        name:       String,
        externalId: Number,
        phone:      String,
        image:      String
    });

    mongoStorage.Models.Restaurants = mongoose.model('restaurants', RestaurantSchema);
}

