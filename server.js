const PORT = process.env.PORT || 3001;
const fs = require('fs');


// Require and assign express
const express = require('express');
const app = express();

// Require database
const notesDB = require('./db/db.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// GET Requests
app.get('api/notes', (req, res) => {
    res.json(notesDB.slice(1))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// TODO: Create Note function
// TODO: Define function arguments
function createNote () {

}


app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, notesDB);
    res.json(newNote);
})

// TODO: Delete Note function
// TODO: Define function arguments
function deleteNote () {

}

app.listen(PORT, () => {
    console.log(`Listening to server on PORT ${PORT}`)
});