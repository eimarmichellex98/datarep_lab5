//Sets up web server that listens in at port 4000
//Using express
const express = require('express');
const app = express();
const port = 4000;
const path = require('path');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.get refers to a get request and '/' is the URL its at
//req is request object and res is response object, here it sends Welcome to DRQ on webpage
app.get('/', (req, res) => {
    res.send('Welcome to Data Representation and Querying')
})

//URL is at /hello:name and send Hello and name specified to webpage
//req.params is the object that contains parameter values parsed from URL path, in this case name
app.get('/hello/:name', (req, res) => {
    res.send('Hello ' + req.params.name)
})

//URL to movies webpage
//JSON sent to webpage when loclahost:4000/api/movies is called
app.get('/api/movies', (req, res) => {
    const movies = [
        {
            "movies": [
                {
                    "Title": "Avengers: Infinity War",
                    "Year": "2018",
                    "imdbID": "tt4154756",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
                },
                {
                    "Title": "Captain America: Civil War",
                    "Year": "2016",
                    "imdbID": "tt3498820",
                    "Type": "movie",
                    "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
                }
            ]
        }
    ];
    //create object mymovies that sends on movies JSON above to webpage
    res.status(200).json({
        mymovies: movies,
        message: 'Here is your data'
    })
})

// /test is used to test the index.html
//res.sendFile gets path (by using express) to get directory (using _dirname) to display waht is in the index.html file 
app.get('/test', (req, res) => {
    res.sendFile(__dirname+'/index.html');
})

//get request, sends data as part of URL
app.get('/name', (req, res) => {
    console.log('/name route point ');
    console.log(req.query.firstname);

    res.send('Hello ' + req.query.firstname + ' ' + req.query.lastname);
})

//post request, sends up as part of the body, need const bodyParser to do this
app.post('/name', (req,res) =>{
    res.send('Hello ' + req.body.firstname + ' ' + req.body.lastname);
})

//listen in at port 4000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})