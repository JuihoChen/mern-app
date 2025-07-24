# client/Dockerfile

# Stage 1: Build the React application
FROM node:18-alpine AS frontend_builder

# Set build argument for API URL
ARG REACT_APP_API_URL
# Set environment variable for React app
ENV REACT_APP_API_URL=$REACT_APP_API_URL

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application source code
COPY . .

# Build the React app for production
RUN CI=true npm run build

# Stage 2: Serve the built application with a lightweight web server
FROM node:18-alpine
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=frontend_builder /app/build ./build

# *** NEW: Install 'serve' package globally to serve static files ***
RUN npm install -g serve

# Expose the port your React app will be served on (e.g., 3000 for create-react-app's build)
EXPOSE 3000

# *** NEW: Command to run the 'serve' static file server ***
# This will serve the contents of the /app/build directory on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]
