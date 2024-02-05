# Dockerfile

# Use the official Node.js image
FROM node:18alpine


# Set the working directory in the container
WORKDIR /opt/app

# Copy package.json and package-lock.json to install dependencies
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the application will use
EXPOSE 3000

# Start the application
CMD ["npm", "start"]