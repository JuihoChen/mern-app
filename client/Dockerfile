# Stage 1: Build the React application
# Renamed the build stage from 'build' to 'frontend_builder'
FROM node:18-alpine AS frontend_builder

# Declare ARG to receive build-time variable
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache.
COPY package.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Copy the Nginx default configuration file.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx index.html to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the 'frontend_builder' stage to the Nginx serving directory
COPY --from=frontend_builder /app/build/ /usr/share/nginx/html

# Expose port 80, as Nginx typically listens on this port
EXPOSE 80
