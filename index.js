var express = require('express');
var phridge  = require('phridge');

var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
    phridge.spawn({ loadImages: false })
        .then(function (phantom) {
            phantom.run("h1", function (selector, resolve) {

                var page = webpage.create();
                // page.customHeaders = { Referer: "http://google.com" };
                // page.settings = { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5)" };
                page.open("http://www.google.com", function (status) {
                    var text = "Nir";//page.evaluate(function () {
//                        return document.querySelector("#_eEe").innerText;
//                    });

                    // resolve the promise and pass 'text' back to node  
                    resolve(text);
                });
            }).then(function (text) {
                // inside node again 
                response.send(text);

                console.log("The element contains the following text: "+ text);
            });
        });
});
//    phantom.openPage("http://www.clickatable.co.il/").then(function (page) {
//        console.log("hey1");
//        console.log(page.render);
//        // page.render('github.png');
//
//        // console.log(document.getElementById('myagent').textContent);
//
//        // page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
//        console.log("hey2");
//        
//        page.evaluate(function() {
//                console.log("Hey,,");//$("ctl00_ContentPlaceHolder1_searchTab1_ddlCities").value());
//            });
//        // });
//    });

// What is app.listen?
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
