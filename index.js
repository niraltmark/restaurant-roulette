var express = require('express');
var phridge  = require('phridge');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
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
                    resolve(page.evaluate(function(){ 
                        return $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.borderRow").length
                            + $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.noBorderRow").length;
                    }));
                } else {
                    reject(new Error("Wait for timeout"));
                }
            }, 100);
        });
    })
    .then(function (result) {
        console.log(result);
        response.end("This is the result " + result);
    })
    .catch(function (err) {
        console.log(err);
    });
});
//        .then(function (phantom) {
//            phantom.run("h1", function (selector, resolve) {
//
//                var page = webpage.create();
//                page.open("http://www.clickatable.co.il/", function (status) {
//                    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//                        page.evaluate(function() {
//                            // Set my default values to Tel Aviv at 20:00 
//                            $("#ctl00_ContentPlaceHolder1_searchTab1_ddlCities").val("b3b33667-84bb-443d-9908-bee86793d0f8");
//                            $("#ctl00_ContentPlaceHolder1_searchTab1_ddlHour").val(20);
//                            $("#ctl00_ContentPlaceHolder1_searchTab1_ddlMinutes").val(0);
//
//                            $("#ctl00_ContentPlaceHolder1_searchTab1_btnMultiSearch").click();
//                        });
//                        
//                        // Waiting for something    
//                        var intervalId = setInterval(function () {
//                            var hasBeenFound = page.evaluate(function () {
//                                return $("#progressDiv").is(":hidden");
//                            });
//
//                            if (hasBeenFound === false) {
//                                return;
//                            }
//
//                            clearInterval(intervalId);
//
//                            if (hasBeenFound) {
//                                resolve(page.evaluate(function(){ 
//                                return $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.borderRow").length
//                                    + $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.noBorderRow").length}));
//                            }
//                        }, 100);
//                    });
//                });
//            });
//        })
//        .then(function (text) {
//                // inside node again 
//                response.send("Amount of results is " + text);
//
//                console.log("The element contains the following text: "+ text);
//            });
//        });

// What is app.listen?
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});