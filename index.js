var express = require('express');
var phridge  = require('phridge');

var app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get('/restaurants/get', function(request, response) {
    
    var cardTypes = [
    { image: 'https://pbs.twimg.com/profile_images/546942133496995840/k7JAxvgq.jpeg' },
    { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  ];
    
    response.json(cardTypes);
    
//    phridge.spawn({ loadImages: false })
//    .then(function (phantom) {
//        return phantom.openPage("http://www.clickatable.co.il/");
//    })
//    .then(function (page) {
//        return page.run("h1", function (selector, resolve, reject) {
//            // this function runs inside PhantomJS bound to the webpage instance
//            
//            var page = this;
//
//            page.evaluate(function () {
//                $("#ctl00_ContentPlaceHolder1_searchTab1_ddlCities").val("b3b33667-84bb-443d-9908-bee86793d0f8").change();
//                $("#ctl00_ContentPlaceHolder1_searchTab1_ddlHour").val(20);
//                $("#ctl00_ContentPlaceHolder1_searchTab1_ddlMinutes").val(0);
//
//                $("#ctl00_ContentPlaceHolder1_searchTab1_btnMultiSearch").click();
//            });
//            
//                var intervalId = setInterval(function () {
//                var hasBeenFound = page.evaluate(function () {
//                    return Boolean($("#progressDiv").is(":hidden"));
//                });
//
//                if (hasBeenFound === false)
//                    /* check if there is still some time left  */ {
//                    // wait for next interval
//                    
//                    console.log("waiting...");
//                    return;
//                }
//
//                clearInterval(intervalId);
//
//                if (hasBeenFound) {
//                    resolve(page.evaluate(function(){ 
//                        return $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.borderRow").length
//                            + $("#ctl00_ContentPlaceHolder1_UpdatePanel1 table tr.noBorderRow").length;
//                    }));
//                } else {
//                    reject(new Error("Wait for timeout"));
//                }
//            }, 100);
//        });
//    })
//    .then(function (result) {
//        console.log(result);
//        response.end("This is the result " + result);
//    })
//    .catch(function (err) {
//        console.log(err);
//    });
});

// What is app.listen?
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});