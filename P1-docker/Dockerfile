# Use an official Node.js runtime as a base image
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