var express = require('express');
var app = express();

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

var pageInit = function(req, res, next) {
  console.log('Request to '+ req.params.name);
  next();
}

app.get('/', pageInit, function (req, res) {
  res.render('index');
});

app.post('/switchA', function (req, res) {
  res.send('Got a POST request at /switchA');
  exec('sudo sh switchA.sh', puts);
});

app.post('/switchB', function (req, res) {
  res.send('Got a POST request at /switchB');
  exec('sudo sh switchB.sh', puts);
});

app.get('/:name', pageInit, function (req, res) {
  res.render(req.params.name);
});

app.listen(3000, function () {
  console.log('ABX app listening on port 3000!');
});
