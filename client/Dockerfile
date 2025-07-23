# Stage 1: Build the React application
# Use a Node.js base image for building the React app.
# 'alpine' variants are smaller and generally preferred for Docker images.
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache.
# This ensures npm install is only re-run if dependencies change.
COPY package.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY . .

# Build the React application for production
# This command typically creates a 'build' folder with optimized static assets.
RUN npm run build

# Stage 2: Serve the React application with Nginx
# Use a lightweight Nginx base image for serving the static files.
FROM nginx:alpine

# Copy the Nginx default configuration file.
# This is a basic config that serves static files and handles client-side routing.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx index.html to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the 'build' stage to the Nginx serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80, as Nginx typically listens on this port
EXPOSE 80

# The default Nginx CMD will start the server, so no explicit CMD is needed here.
# CMD ["nginx", "-g", "daemon off;"] # This is the default Nginx command

