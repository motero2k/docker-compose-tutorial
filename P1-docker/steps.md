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

A dockerfile tells docker how to create a docker image from your source code.

In the P1 folder create a Dockerfile file:
```Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /opt/app

# Adds the source code at the current directory to the working directory (WORKDIR=opt/app) inside the container
COPY . .

# Install app dependencies
RUN npm install --only=prod

# Expose the port the app runs on
EXPOSE 3000

# This command it's going to be executed inside the container when the container starts
CMD [ "npm", "start" ]
```
## Build app image

The image is the template to create instances of your app (containers).

To begin, ensure that **Docker is installed on your system**. For this demonstration, I'll be utilizing Docker Desktop. Docker desktop is compatible with macOS, Linux and Windows. Download page [here](https://www.docker.com/products/docker-desktop/).

Docker build command: `docker build [options] PATH`
```bash
docker build -t motero2k/simplest-app:v1.0.0 .
```
- The dot at the end means that the current path is the build context.
- **-t** sets the name of the image. If you want to uplad to dockerhub use: `dockerhub-username/image-name:VERSION`. Else you can use `image-name`
## Run image

Running a image means creating an instance of your app (a container is created)
Docker run image command: `docker run [options] image-name`
```bash
docker run -p 8080:3333 -e PORT=3333 -d --name simplest-app motero2k/simplest-app:v1.0.0
```
Clarification: 
+ **-e PORT=3333**  Sets the environment variable PORT to 3333 inside the container. Rememeber that we coded the app to listen on process.env.PORT or 3000 if the port is not specified. 
+ **-p 8080:3333**  Binds port 3333 from the container (express server listening in port 3333) to port 8080 on the host (You can access the server at localhost:8080).
+ **-d**  Runs the container in detached mode, allowing it to run in the background. This allows us to continue using the console. You can access the container console inside docker desktop.
+ **--name simplest-app**  Specifies the name of the container as "simplest-app".
+  **motero2k/simplest-app:v1.0.0** Specifies the Docker image and version to use for creating the container.

To start/stop the container:
```bash
docker start simplest-app

docker stop simplest-app
```