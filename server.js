// Require dependencies
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

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
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Create Note function
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteLength = (noteArray.length).toString();

    newNote.id = noteLength;
    noteArray.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));
    res.json(noteArray)
});

// Delete Note function
app.delete('/api/notes/:id', (req, res) => {
    let noteArray = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteID = (req.params.id).toString();


    noteArray = noteArray.filter(currNote => {
        return currNote.id != noteID;
    })

    fs.writeFileSync('./db/db.json', JSON.stringify(noteArray));
    res.json(noteArray);
});

app.listen(PORT, () => {
    console.log(`Listening to server on PORT ${PORT}`)
});