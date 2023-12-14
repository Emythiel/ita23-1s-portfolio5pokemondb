// Library Imports
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
//const {query} = require("express");

const app = express();
const port = 3000;

app.use(cors());

// MySQL Database Credentials
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// Get list of all pokemon
// Or get details for specific pokemon with pokedex or name query
app.get('/pokemon', (req, res)=> {
    const queryPokedex = req.query.pokedex;
    const queryName = req.query.name;
    // Check if pokedex or name was entered as query
    if (queryPokedex || queryName) {
        connection.query('SELECT * FROM pokemon WHERE pokedex_number = ? OR `name` = ?',
        [queryPokedex, queryName],
        (error, results) => {
            // Check if there's results. If not, pokemon doesn't exist, send 404
            if (results.length > 0) {
                res.send(results)
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        connection.query('SELECT * FROM pokemon', (error, results)=> {
            res.send(results);
        });
    }
});

// Get list of all towns
app.get('/towns', (req, res) => {
    connection.query('SELECT `name`, population, latitude, longitude FROM towns', (error, results) => {
        res.send(results);
    });
})

// Get list of all gyms
app.get('/gyms', (req, res) => {
    connection.query(
        'SELECT gyms.`name` AS gym_name, trainers.`name` AS gym_leader, pokemon_type ' +
        'FROM gyms ' +
        'INNER JOIN trainers ON trainers.trainer_id = gyms.leader',
        (error, results) => {
            res.send(results);
        });
})

// Get list of all trainers, with their id, name, hometown, gym and team
// If trainer name is added as parameter, show only that trainer
// Eg. if /trainers?name=brock, show only brock

app.get('/trainers', (req, res) => {
    // Store user query parameter
    const queryParameter = req.query.name;

    // Define the default query string
    let query = 'SELECT trainers.trainer_id, trainers.`name` AS trainer, towns.`name` AS home_town, gyms.`name` AS gym, gyms.leader AS leader_id ' +
                       'FROM trainers ' +
                       'LEFT JOIN gyms ON gyms.gym_id = trainers.gym_id ' +
                       'LEFT JOIN towns on towns.town_id = trainers.home_town';

    // Check if query parameter was set
    // If set, add trainers.`name` to the query, and add queryParameter to params
    const params = [];
    if (queryParameter) {
        query += ' WHERE trainers.`name` = ?';
        params.push(queryParameter)
    }

    // Run the query
    connection.query(query, params, (errorTrainer, resultsTrainer) => {
        // If results exists, trainers exists, continue
        if (resultsTrainer.length > 0) {

            // Run new query to add pokemon to trainers team
            const getTeamsForTrainer = (trainerObject) => {
                const trainerName = trainerObject.trainer;
                // Promise statement, so ensure client doesn't get result until all trainer teams are done
                return new Promise((resolve, reject) => {
                    connection.query(
                        'SELECT pokemon.pokedex_number, pokemon.`name`, teams.`level` ' +
                        'FROM teams ' +
                        'INNER JOIN trainers ON trainers.trainer_id = teams.trainer_id ' +
                        'INNER JOIN pokemon ON pokemon.pokedex_number = teams.pokedex_number ' +
                        'WHERE trainers.`name` = ?',
                        [trainerName],
                        (errorTeam, resultsTeam) => {
                            if (errorTeam) {
                                reject(errorTeam);
                            } else {
                                resolve({ ...trainerObject, team: resultsTeam });
                            }
                        }
                    );
                });
            };

            const promises = resultsTrainer.map(getTeamsForTrainer);
            // Send final result to client
            Promise.all(promises)
                .then((updatedResultsTrainer) => {
                    res.send(updatedResultsTrainer);
                })
                .catch((error) => {
                    // Internal Server Error)
                    res.sendStatus(500)
                });
        } else {
            res.sendStatus(404)
        }
    });
});


// Return 404 if none of above requests matched
app.get('*', (req, res) => {
    res.sendStatus(404);
});

// Listen on port
app.listen(port, () =>{
    console.log(`Application is now running on port ${port}`);
});

app.use((req, res, next) => {
    res.status(404).send("404 - I can't find that!");
});