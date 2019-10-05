var port = process.env.VCAP_APP_PORT || 8080;
//Express Web Framework, and create a new express server
var express = require('express'),
	app = express();
var path = require('path');
var bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
	extended: false
}));
var index = require('./routes'),
	author = require('./routes/author');
//In case the caller access any URI under the root /, call index route
app.use('/', index);
//In case the caller access any URI under /author, call author route
app.use('/author', author);
// In case the caller calls GET to the root '/', return 'Hello Express!'.
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'views/index.html'));
	res.send('Hello Express!');
});


// In case the caller calls POST to /author, return 'Author name'
app.post('/author', function(req, res) {
	res.send('You called the server requesting the author of the article: ' + req.body.url);
});
// start server on the specified port and binding host
app.listen(port);
