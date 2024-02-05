/*
* Copyright (c) 2024 Manuel Otero Barbasán
*/

const express = require('express');
const app = express();
//You can set the port using the environment variable PORT (e.g. in a dockerfile)
const port = process.env.PORT || 3000;

//Set the route for the app: app.get(path, callback)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Make the app listen on the port
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  console.log("==================================================")
});
