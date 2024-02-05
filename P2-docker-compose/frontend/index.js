/*
* Copyright (c) 2024 Manuel Otero Barbasán
*/
const axios = require('axios');
const express = require('express');
const app = express();
//You can set the port using the environment variable PORT (e.g. in a dockerfile)
const port = process.env.PORT || 3000;
const backendPort = process.env.BACKENDPORT || 4000;
//Set the route for the app: app.get(path, callback)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/fruits', async (req, res) => {
  try {
    console.log("requesting fruits from backend")
    const response = await axios.get(`http://host.docker.internal:4000/fruits`);
    const fruits = response.data;
    res.json(fruits);
  } catch (error) {
    console.error('Error retrieving fruits from backend:', error);
    res.status(500).send('Internal Server Error');
  }
});

//Make the app listen on the port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  console.log("==================================================")
});
