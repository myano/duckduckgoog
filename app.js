var express = require('express'),
        http = require('http');

var app = express();

app.locals.pretty = true;

var request = require("request");

//window.myDebug = require("debug");

app.configure(function(){
    app.set('port', 3000);
    app.set('view engine', 'jade');
    //app.set('debug', 'True');
    app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
});

app.configure('production', function(){
    app.use(express.errorHandler());
    app.use(express.logger());
});

/* app.get('/', function(req, res) {
    if (req.query["q"]) {
        query = req.query["q"];
        encQuery = encodeURIComponent(query);

        if (query.match(/![A-Za-z0-9]+/) || query.substring(0, 2) === "! " || query.substring(0, 1) === "\\") {

            console.log('Queried DuckDuckGo');
            res.redirect('https://duckduckgo.com/html/?q=' + encQuery);

        } else if (req.query['searchengine']) {

            console.log('Queried custom search engine');
            searchEngine = req.query['searchengine'];
            if (searchEngine.search() != -1 && (searchEngine.lastIndexOf('http://', 0) === 0 || searchEngine.lastIndexOf('https://', 0) === 0)) {
                customSearchURL = searchEngine.replace(/%q/g, encQuery);
                res.redirect(customSearchURL);
            } else {
                console.log('Error in search engine syntax. Using Startpage.');
                res.redirect('https://startpage.com/do/search?query=' + encQuery + 'foo3');
            }

        } else {

            console.log('Queried Startpage');
            if (req.query['start']) {
                        res.redirect('https://' + req.query['start'] + '/do/search?query=' + encQuery);
            }
            else {
                res.redirect('https://startpage.com/do/search?query=' + encQuery);
            }

        }
    }
    res.render('index');
});

*/

//var request = require('request');


app.post('/', function(req, res) {

    //*if (req.query["query"] || req.query["q"]) {
    /*
        query = '';
        if (req.query["query"]) {
            query = req.query["query"];
        }
        else if (req.query["q"]) {
            query = req.query["q"];
        }
    // end
    */

    console.log('Got a POST request!');

    if (req.body.query) {   // || req.query["query"] || req.query["q"]) {
        console.log('Got POST params in a POST request');

        query = '';
        if (req.body.query) {
            query = req.body.query;
        }

        encQuery = encodeURIComponent(query);

        if (query.match(/![A-Za-z0-9]+/) || query.substring(0, 2) === "! ") {
            console.log('Found a !bang');
            if (query.match(/!g/)) {
                console.log('Queried Google (override)');
                new_query = query.replace(/!g\s?/, "");
                new_query = new_query.replace(/\s{2,}/g, "");
                new_query = new_query.trim();
                new_query = encodeURIComponent(new_query)
                res.redirect(302, 'https://www.google.com/search?q=' + new_query);
            }
            else {
                console.log('Queried DuckDuckGo');
                res.redirect(302, 'https://duckduckgo.com/?q=' + encQuery);
            }
        }
        else if (req.body.searchengine) {
            console.log('Queried custom search engine');
            searchEngine = req.query['searchengine'];
            if (searchEngine.search() != -1 && (searchEngine.lastIndexOf('http://', 0) === 0 || searchEngine.lastIndexOf('https://', 0) === 0)) {
                customSearchURL = searchEngine.replace(/%q/g, encQuery);
                res.redirect(302, customSearchURL);
            }
            else {
                /*
                request.post({ url: 'https://startpage.com/rth/search', headers: {'content-type' : 'application/x-www-form-urlencoded'}, body: 'query=' + encQuery},
                        function(error, response, body){
                            res.end(body);
                        });
                */
                res.redirect(307, 'https://www.startpage.com/do/search');
            }
        }
        else {
                /*request.post({ url: 'https://startpage.com/rth/search', headers: {'content-type' : 'application/x-www-form-urlencoded'}, body: 'query=' + encQuery},
                        function(error, response, body){
                            res.end(body);
                        });
                */
                res.redirect(307, 'https://www.startpage.com/do/search');
        }
    }
    else if (req.query["query"] || req.query["q"]) {
        console.log('Got GET parameters in a POST!');
        query = '';

        if (req.query["query"]) {
            query = req.query["query"];
        }
        else if (req.query["q"]) {
            query = req.query["q"];
        }

        encQuery = encodeURIComponent(query);

        if (query.match(/![A-Za-z0-9]+/) || query.substring(0, 2) === "! ") {
            console.log('Found a !bang');
            if (query.match(/!g/)) {
                console.log('Queried Google (override)');
                new_query = query.replace(/!g\s?/, "");                                                                                                                 new_query = new_query.replace(/\s{2,}/g, "");
                new_query = new_query.trim();
                new_query = encodeURIComponent(new_query)
                res.redirect(302, 'https://www.google.com/search?q=' + new_query);
            }
            else {
                console.log('Queried DuckDuckGo');
                res.redirect(302, 'https://duckduckgo.com/?q=' + encQuery);
            }
        }
        else if (req.body.searchengine) {
            console.log('Queried custom search engine');
            searchEngine = req.query['searchengine'];
            if (searchEngine.search() != -1 && (searchEngine.lastIndexOf('http://', 0) === 0 || searchEngine.lastIndexOf('https://', 0) === 0)) {
                customSearchURL = searchEngine.replace(/%q/g, encQuery);
            res.redirect(302, customSearchURL);
            }
            else {
                //res.redirect(302, 'https://startpage.com/do/metasearch.pl?query=' + encQuery);
                //res.redirect(302, 'https://startpage.com/do/search?prf=2cc506ab255c98e10570b7d50ef6b1c8&cat=web&query=' + encQuery);
                //res.redirect(307, 'https://startpage.com/do/search?query=' + encQuery + '&cat=web&pl=chrome&language=english');
                res.redirect(307, 'https://www.startpage.com/do/search');
            }
        }
        else {
            //res.redirect(302, 'https://startpage.com/do/metasearch.pl?query=' + encQuery);
            //res.redirect(302, 'https://startpage.com/do/search?prf=2cc506ab255c98e10570b7d50ef6b1c8&cat=web&query=' + encQuery);
            //res.redirect(307, 'https://startpage.com/do/search?query=' + encQuery + '&cat=web&pl=chrome&language=english');
            res.redirect(307, 'https://www.startpage.com/do/search');
        }
    }
    else {
        res.render('index2');
    }


        //request.post({ url: 'https://startpage.com/rth/search', headers: {'content-type' : 'application/x-www-form-urlencoded'}, body: 'query=' + encQuery},
        //        function(error, response, body){
        //            console.log(body);
        //            res.end(body);
        //        });
});

app.get('/', function(req, res) {
    console.log('Got a GET request!')

    query = "";

    if (req.query["query"]) {
        query = req.query["query"];
    } else if (req.query["q"]) {
        query = req.query["q"];
    } else {
        // no input provided
        res.render('index2');
    }

    encQuery = encodeURIComponent(query);

    if (query.match(/![A-Za-z0-9]+/) || query.substring(0, 2) === "! ") {
        console.log('Found a !bang');
        if (query.match(/!g/)) {
            console.log('Queried Google (override)');
            new_query = query.replace(/!g\s?/, "");
            new_query = new_query.replace(/\s{2,}/g, "");
            new_query = new_query.trim();
            new_query = encodeURIComponent(new_query)
            res.redirect(302, 'https://www.google.com/search?q=' + new_query);
        }
        else {
            console.log('Queried DuckDuckGo');
            res.redirect(302, 'https://duckduckgo.com/?q=' + encQuery);
        }

    }
    else if (req.query["searchengine"]) {
        console.log('Queried custom search engine');
        searchEngine = req.query['searchengine'];
        if (searchEngine.search() != -1 && (searchEngine.lastIndexOf('http://', 0) === 0 || searchEngine.lastIndexOf('https://', 0) === 0)) {
            customSearchURL = searchEngine.replace(/%q/g, encQuery);
            res.redirect(302, customSearchURL);
        }
        else {
            // default to Startpage
            console.log('Queried Startpage');
            //res.redirect(307, 'https://startpage.com/do/search');
            //res.redirect(302, 'https://startpage.com/do/asearch?query=' + encQuery);
            //res.redirect(302, 'https://startpage.com/do/search?prf=2cc506ab255c98e10570b7d50ef6b1c8&cat=web&query=' + encQuery);
            //res.redirect(307, 'https://startpage.com/do/search?query=' + encQuery + '&cat=web&pl=chrome&language=english');
            res.redirect(307, 'https://www.startpage.com/do/search?query=' + encQuery + '&cat=web');
            //res.redirect(302, 'https://startpage.com/do/mypage.pl?prf=9b09b0ead434044b0043ff2a9ab05b47&query=' + encQuery);
        }
    }
    else {
        // default to startpage
        console.log('Queried Startpage');
        //res.redirect(307, 'https://startpage.com/do/search');
        //res.redirect(307, 'https://startpage.com/do/asearch?query=' + encQuery);
        //res.redirect(302, 'https://startpage.com/do/search?prf=2cc506ab255c98e10570b7d50ef6b1c8&cat=web&query=' + encQuery);
        //res.redirect(307, 'https://startpage.com/do/search?query=' + encQuery + '&cat=web&pl=chrome&language=english');
        res.redirect(307, 'https://www.startpage.com/do/search?query=' + encQuery + '&cat=web');
        //res.redirect(302, 'https://startpage.com/do/mypage.pl?prf=9b09b0ead434044b0043ff2a9ab05b47&query=' + encQuery);
    }
    // }
    //else {
        // no parameters provided!
        //res.render('index2');
    //}
});

app.get('/browser_probs', function(req, res) {
    res.render('browser_probs');
});

/*
app.get('/which_engine', function(req, res) {
    if (req.query["query"] || req.query["q"]) {
        query = '';
        if (req.query["query"]) {
            query = req.query["query"];
        }
        else if {
            query = req.query["q"];
        }

        if (query.match(/![A-Za-z0-9]+/) || query.substring(0, 2) === "! ") {

    }
});
*/

app.get('/index-mobile', function(req, res) {
    res.render('index-mobile');
});

app.get('/index-premobile', function(req, res) {
    res.render('index-premobile');
});

app.get('/browser', function(req, res) {
    res.render('browser');
});

app.get('/privacy', function(req, res) {
    res.render('privacy');
});

// added these in for error handling
app.get('/404', function(req, res, next){
    // trigger a 404 since no other middleware
    // will match /404 after this one, and we're not
    // responding here
    next();
});

app.get('/403', function(req, res, next){
    // trigger a 403 error
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function(req, res, next){
    // trigger a generic (500) error
    next(new Error('keyboard cat!'));
});

app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

app.use(function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status(err.status || 500);
    res.render('500', { error: err });
});


http.createServer(app).listen(app.get('port'), 'localhost', function(){
    console.log("Express server listening on port " + app.get('port'));
});
