module.exports = function() {

    return {
        get: function() {
            
            var Promise = require('promise');
            return new Promise(function(fulfill, _reject){
            var phridge  = require('phridge');

            phridge.spawn({ loadImages: false })
            .then(function (phantom) {
                return phantom.openPage("http://www.clickatable.co.il/");
            })
            .then(function (page) { 
                return page.run("h1", function (selector, resolve, reject) {
                    // this function runs inside PhantomJS bound to the webpage instance

                    var page = this;

                    page.evaluate(function () {
                        $("#ctl00_ContentPlaceHolder1_searchTab1_ddlCities").val("b3b33667-84bb-443d-9908-bee86793d0f8").change();
                        $("#ctl00_ContentPlaceHolder1_searchTab1_ddlHour").val(20);
                        $("#ctl00_ContentPlaceHolder1_searchTab1_ddlMinutes").val(0);

                        $("#ctl00_ContentPlaceHolder1_searchTab1_btnMultiSearch").click();
                    });

                        var intervalId = setInterval(function () {
                        var hasBeenFound = page.evaluate(function () {
                            return Boolean($("#progressDiv").is(":hidden"));
                        });

                        if (hasBeenFound === false)
                            /* check if there is still some time left  */ {
                            // wait for next interval

                            console.log("waiting...");
                            return;
                        }

                        clearInterval(intervalId);

                        if (hasBeenFound) {
                            // Get the data
                            
                            

                            var data = page.evaluate(function(){
                                var images = ['http://www.richybug.com/wp-content/uploads/2015/01/beautiful-beauty-cute.jpg',
                                             'http://s1.favim.com/orig/14/delicious-food-yum-Favim.com-183557.jpg',
                                             'http://cdnimg.visualizeus.com/thumbs/b5/cd/yum,delicious,food,nonveg,tasty-b5cd68932da4664fd2628e566ad96419_h.jpg',
                                             'http://s3.favim.com/orig/40/brownie-cake-chocolate-delicious-food-Favim.com-335002.jpg'];

                               return $(".restaurantNameButton").map(function(index1,element1) {
                                   var name = $(element1).text();

                                   var times = $(element1).closest("tr").find(".btn_HazmenMakom1, .btn_HazmenMakom2").map(function(index2, element2){
                                       return $(element2).val();
                                    });

                                   return {name: name, time:times.get(0), image: images[index1 % images.length]};
                               }).get();
                            });

                            resolve(data);
                        } else {
                            reject(new Error("Wait for timeout"));
                        }
                    }, 100);
                });
            })
            .then(function (result) {
                console.log(result);

                fulfill(result);
            })
            .catch(function (err) {
                console.log(err);
            });

            });
        }
    };
}
