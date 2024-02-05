/*
* Copyright (c) 2024 Manuel Otero Barbasán
*/
// index.js

const express = require('express');
const { connectDB } = require('./db'); // Adjust the path based on the actual location

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
let db;

connectDB()
  .then(database => {
    db = database;
    // Start the server only after connecting to MongoDB
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
      console.log("==================================================");
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Get fruits from MongoDB
app.get('/fruits', async (req, res) => {
  try {
    // const fruits = await db.collection('fruits').find({}).toArray();
    const fruits = { "fruits": ["apple", "banana", "orange"] };
    res.json(fruits);
  } catch (error) {
    console.error('Error retrieving fruits from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  }
});

