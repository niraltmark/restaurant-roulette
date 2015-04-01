var express = require('express');
var phridge  = require('phridge');

var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
    phridge.spawn({ loadImages: false })
        .then(function (phantom) {
            phantom.run("h1", function (selector, resolve) {

                var page = webpage.create();
                page.open("http://www.clickatable.co.il/", function (status) {
                    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
                        var text = page.evaluate(function() {
                            return $("#ctl00_ContentPlaceHolder1_searchTab1_ddlCities").val();
                        });
                        
                        resolve(text);
                    });
//                    var text = page.evaluate(function () {
//                        return document.title;
//                    });

                    // resolve the promise and pass 'text' back to node  
                    // resolve("Nir");
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
        
//    });

// What is app.listen?
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
