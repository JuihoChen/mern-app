# Use a Node.js base image for the backend application.
FROM node:22-alpine

# Update package lists and upgrade packages to reduce vulnerabilities
RUN apk update && apk upgrade

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to cache dependencies.
# This ensures npm install is only re-run if dependencies change.
COPY package.json ./
COPY package-lock.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the backend application code (models/, routes/, server.js, .env etc.)
COPY . .

# Expose the port your Express app listens on (e.g., 5000)
# Make sure this matches the port your server.js (or equivalent) is configured to listen on.
EXPOSE 5000

# Command to run your Node.js application
# Replace 'server.js' with your actual main server file if it's different.
CMD ["node", "server.js"]

