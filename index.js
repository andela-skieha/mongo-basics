/* eslint-disable no-console */

// require dependencies
var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/cats');

// get notified of success/failure of db connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', function() {
	console.log('Connection Successful');
	// reference to schema
	var kittySchema = mongoose.Schema({
		name: String
	});

	// adding methods to kitten document
	kittySchema.methods.speak = function() {
		var greeting = this.name
		? 'Meow name is ' + this.name
		: 'I don\'t have a name';
		console.log(greeting);
	};

	// Model definition
	var Kitten = mongoose.model('Kitten', kittySchema);

	// kitten document
	var silence = new Kitten({ name: 'Silence'});
	// saving kitten document to mongodb
	silence.save(function(err, silence) {
		if (err) {
			return console.error(err);
		}
		silence.speak();
	});

	// displaying all kittens in the db
	Kitten.find(function(err, kittens) {
		if (err) {
			return console.error(err);
		}
		console.log(kittens);
	});
});
