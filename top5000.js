var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'top5000_db'
});

// Ask the user to make a selection
function promptUserInput() {
	inquirer.prompt([
		{
			type: 'list',
			name: 'filter',
			message: 'What kind of search would you like to do?', 
			choices: ['By Artist', 'By Song Count', 'By Year Range', 'By Song Name']
		}
	]).then(function (input) {
		console.log('User selected ' + input.filter);

		// Perform the appropriate query
		if (input.filter === 'By Artist') {
			// console.log('___By Artist___');
			queryByArtist();

		} else if (input.filter === 'By Song Count') {
			// console.log('___By Song Count___');
			queryBySongCount();

		} else if (input.filter === 'By Year Range') {
			// console.log('___By Year Range___');
			queryByYearRange();

		} else if(input.filter === 'By Song Name') {
			// console.log('___By Song Name___');
			queryBySongName();

		}
	})
}

function queryByArtist() {
	// console.log('___queryByArtist___');

	inquirer.prompt([
		{
			type: 'input',
			name: 'artist',
			message: 'Please enter the artist of your choice.'
		}
	]).then(function(input) {
		queryStr = 'SELECT * FROM top5000_songs WHERE ?';
		connection.query(queryStr, {artist: input.artist}, function(err, data) {
			if (err) throw err;

			console.log('Songs Returned: ');
			console.log('..................\n');

			for (var i = 0; i < data.length; i++) {
				console.log([
					data[i].position,
					data[i].artist,
					data[i].song,
					data[i].year
				].join(" | "));
			}

		  	console.log("\n---------------------------------------------------------------------\n");
		  	connection.end();
		})
	})
}

function queryBySongCount() {
	// console.log('___queryBySongCount___');

	inquirer.prompt([
		{
			type: 'input',
			name: 'count',
			message: 'Please enter the minumum count value for artist appearance.'
		}
	]).then(function(input) {
		queryStr = 'SELECT artist FROM top5000_songs GROUP BY artist HAVING COUNT(*) > ' + input.count;
		connection.query(queryStr, function(err, data) {
			if (err) throw err;

			console.log('Artists Returned: ');
			console.log('....................\n');

			for (var i = 0; i < data.length; i++) {
				console.log([
					data[i].artist
				].join(" | "));
			}

		  	console.log("\n---------------------------------------------------------------------\n");
		  	connection.end();
		})
	})
}

function queryByYearRange() {
	// console.log('___queryByYearRange___');

	inquirer.prompt([
		{
			type: 'input',
			name: 'begin',
			message: 'Please enter the start year.'
		},
		{
			type: 'input',
			name: 'end',
			message: 'Please enter the end year.'
		}
	]).then(function(input) {
		queryStr = 'SELECT * FROM top5000_songs WHERE year BETWEEN ? AND ?';
		connection.query(queryStr, [input.begin, input.end], function(err, data) {
			if (err) throw err;

			console.log('Songs Returned: ');
			console.log('..................\n');

			for (var i = 0; i < data.length; i++) {
				console.log([
					data[i].position,
					data[i].artist,
					data[i].song,
					data[i].year
				].join(" | "));
			}

		  	console.log("\n---------------------------------------------------------------------\n");
		  	connection.end();
		})
	})
}

function queryBySongName() {
	// console.log('___queryBySongName___');

	inquirer.prompt([
		{
			type: 'input',
			name: 'song',
			message: 'Please enter the name of the song.'
		}
	]).then(function(input) {
		queryStr = 'SELECT * FROM top5000_songs WHERE ?';
		connection.query(queryStr, {song: input.song}, function(err, data) {
			if (err) throw err;

			console.log('Songs Information: ');
			console.log('.....................\n');

			for (var i = 0; i < data.length; i++) {
				console.log([
					data[i].position,
					data[i].artist,
					data[i].song,
					data[i].year
				].join(" | "));
			}

		  	console.log("\n---------------------------------------------------------------------\n");
		  	connection.end();
		})
	})
}

// Run the application and prompt the user to make a selection
promptUserInput();
