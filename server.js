// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var morgan       = require('morgan');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 80; 		// set our port

var mysql	= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root'
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
});


app.use(morgan('dev')); // log every request to the console

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// more routes for our API will happen here

//on root level routes
// ----------------------------------------------------

router.route('/scotch')
	.get(function(req, res) {
		res.sendFile(__dirname + '/scotch/index.html');	
	});

router.route('/scotch/pages')
	.get(function(req, res) {
		res.sendFile(__dirname + '/scotch/index.html');		
	});
	app.get('pages/:name', function(request, response) {
		var name = request.params.name;
		response.render('pages/' + name);
	});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/planet')

	.post(function(req, res) {
		var starName = req.body.starName;
		
		var strQuery = "SELECT * FROM `space`.planet AS p JOIN `space`.starorbiter AS so on p.planetId = so.planetId WHERE so.starId = (SELECT starId From `space`.star WHERE name = '" + starName + "') ORDER BY so.planetId; ";	
		  
		connection.query( strQuery, function(err, rows){
			if(err)	{
				throw err;
			}else{
				res.json( rows );
			}
		});
	})
	
	.put(function(req, res) {
		var starName = req.body.starName;
		var mass = req.body.mass;
		
		mass = parseInt(mass);
		if((typeof mass === 'number') && (mass % 1 === 0)){
		
			var strQuery = "UPDATE `space`.planet AS p JOIN `space`.starorbiter AS so on p.planetId = so.planetId SET mass = mass + " + mass + " WHERE so.starId = (SELECT starId From `space`.star WHERE name = '" + starName + "');";
			  
			connection.query( strQuery, function(err, rows){
				if(err)	{
					throw err;
				}else{
					var strQuery = "SELECT * FROM `space`.planet AS p JOIN `space`.starorbiter AS so on p.planetId = so.planetId WHERE so.starId = (SELECT starId From `space`.star WHERE name = '" + starName + "') ORDER BY so.planetId;";	
					console.log(strQuery);
					
					connection.query( strQuery, function(err, rows){
						if(err)	{
							throw err;
						}else{
							res.json( rows );
						}
					});
				}
			});
		} else {
			res.send({});
		}
	});
	
router.route('/comet')

	.post(function(req, res) {
		var cometId = req.body.cometId;
		cometId = parseInt(cometId);
		if((typeof cometId === 'number') && (cometId % 1 === 0)){
		
			var strQuery = "SELECT asteroidId, orbitSolutionReference, cometId FROM `space`.asteroid INNER JOIN `space`.comet on orbitSolutionReference = orbitReference WHERE cometId = " + cometId + ";";	
			console.log(strQuery);
			  
			connection.query( strQuery, function(err, rows){
				if(err)	{
					throw err;
				}else{
					res.json( rows );
				}
			});
		} else {
			res.send({});
		}
	});
	
router.route('/galaxy')

	.post(function(req, res) {
		var name = req.body.name;
		var type = req.body.type;
		var diameter = req.body.diameter;
		var thickness = req.body.thickness;
		var mass = req.body.mass;
		var spiralPeriod = req.body.spiralPeriod;
		var barPeriod = req.body.barPeriod;
		
		diameter = parseInt(diameter);
		thickness = parseInt(thickness);
		mass = parseInt(mass);
		spiralPeriod = parseInt(spiralPeriod);
		barPeriod = parseInt(barPeriod);
		
		if((typeof diameter === 'number') && (diameter % 1 === 0) && (typeof thickness === 'number') && (thickness % 1 === 0) && (typeof mass === 'number') && (mass % 1 === 0) && (typeof spiralPeriod === 'number') && (spiralPeriod % 1 === 0) && (typeof barPeriod === 'number') && (barPeriod % 1 === 0)){
							var strQuery = "INSERT INTO `space`.galaxy (name, type, diameter, thickness, mass, spiralPeriod, barPeriod) VALUES ('" + name + "', '" + type + "', " + diameter + ", " + thickness + ", " + mass + ", " + spiralPeriod + ", " + barPeriod + ");"
			console.log(strQuery);
			
			connection.query( strQuery, function(err, rows){
				if(err)	{
					throw err;
				}else{
					var strQuery = "SELECT * FROM `space`.galaxy WHERE name = '" + name + "' LIMIT 1;";	
					console.log(strQuery);
					
					connection.query( strQuery, function(err, rows){
						if(err)	{
							throw err;
						}else{
							res.json( rows );
						}
					});
				};
			});
		} else {
			res.send({});
		}
});
	
router.route('/galaxyNumber')

	.post(function(req, res) {
		var name = req.body.name;
		
		var strQuery = "SELECT g.name, COUNT(so.orbiterId) AS NumOrbiters FROM `space`.galaxy AS g JOIN `space`.star AS s on g.galaxyId = s.galaxyId JOIN `space`.starorbiter AS so on s.starId = so.starId WHERE g.name = '" + name + "' GROUP BY g.galaxyId ORDER BY NumOrbiters DESC;"
		console.log(strQuery);
		
		connection.query( strQuery, function(err, rows){
			if(err)	{
				throw err;
			}else{
				res.json( rows );
			};
		});
	});
	
router.route('/start')

	.get(function(req, res) {
		
		connection.connect(function(err) {
		  // connected! (unless `err` is set)
		});
		
		res.send({});
	});
	
router.route('/end')

	.get(function(req, res) {
		
		connection.end(function(err) {
		  // connected! (unless `err` is set)
		});
		res.send({});
	});

	
router.route('*')

	//on basic get commands at the http://198.100.155.100:9001/
	.get(function(req, res) {
		res.redirect('/scotch');
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/css', express.static(__dirname, '/css'))
app.use('/scotch', express.static(__dirname, '/scotch'))
app.use('/scotch/pages', express.static(__dirname, '/scotch/pages'))

app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);