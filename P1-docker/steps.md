#Docker tutorial
## Index

1. [Code the app](#code-the-app)
2. [Create Dockerfile](#create-dockerfile)
3. [Build app image](#build-app-image)
4. [Run image](#run-image)
## Code the app
Go to the tutorial-part1 folder
```bash
cd P1-docker/ 
```
Initialize npm
```bash
npm init 
```
Install express
```bash
npm install express
```
Create a index.js (main file)
```js
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
```
Create the index.html view 
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simplest App</title>
</head>
<body>
  <h1>Welcome to the simplest app!</h1>
</body>
</html>
```

Let's set a script to start the server in the packaje.json:
```json
{
    ...
    "scripts": {
        "start": "node index.js"
    }
  ...
}
```
Run the server
```bash
npm start
```
Check your awesome page at <http://localhost:3000>
## Create Dockerfile
## Build app image
## Run image