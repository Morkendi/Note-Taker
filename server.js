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