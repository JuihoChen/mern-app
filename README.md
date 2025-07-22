# MERN Stack Application Setup Guide

This guide provides step-by-step instructions for setting up a full-stack web application using the MERN stack (MongoDB, Express.js, React, Node.js).

## Table of Contents

- [Understanding Each Component](#understanding-each-component)
- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-by-step-setup)
  - [Step 1: Set up the Backend (Node.js & Express.js)](#step-1-set-up-the-backend-nodejs--expressjs)
  - [Step 2: Create a Simple API with Mongoose](#step-2-create-a-simple-api-with-mongoose)
  - [Step 3: Set up the Frontend (React)](#step-3-set-up-the-frontend-react)
- [Troubleshooting](#troubleshooting)
  - [Node.js Installation Error](#nodejs-installation-error)
- [Project Structure](#project-structure)

## Understanding Each Component

The MERN stack is a popular choice for building full-stack web applications because it allows you to write all your code in JavaScript.

* **MongoDB (Database):** A NoSQL, document-oriented database. It stores data in flexible, JSON-like documents, which maps well with JavaScript objects.
* **Express.js (Backend Framework):** A fast, unopinionated, minimalist web framework for Node.js. It helps you build robust APIs (Application Programming Interfaces) for your application, handling routes, requests, and responses.
* **React (Frontend Library):** A JavaScript library for building user interfaces. It's component-based, allowing you to create reusable UI elements and manage the state of your application efficiently.
* **Node.js (Backend Runtime):** A JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server, making it possible to use JavaScript for both your frontend and backend.

## Prerequisites

Before you start, make sure you have the following installed:

* **Node.js and npm (Node Package Manager):** Download and install from [nodejs.org](https://nodejs.org/). `npm` comes with Node.js and is used to manage project dependencies.
    * **Installation on Ubuntu/Debian:**
        ```bash
        sudo apt update
        sudo apt install nodejs npm
        ```
* **MongoDB:** Download and install from [mongodb.com](https://www.mongodb.com/). You'll also need to know how to run the MongoDB server (`mongod`) and use tools like MongoDB Compass (a GUI) or the MongoDB Shell (`mongo`) for database interaction.
    * **Installation on Ubuntu:**
        ```bash
        # Import the public key used by the package management system
        wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

        # Create a list file for MongoDB
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

        # Reload local package database
        sudo apt update

        # Install MongoDB
        sudo apt install -y mongodb-org
        ```
    * **Managing MongoDB Service:**
        After installation, MongoDB is usually set up as a system service. You'd start it using:
        ```bash
        sudo systemctl start mongod        # Start the MongoDB service
        sudo systemctl enable mongod # To start on boot
        sudo systemctl status mongod # Check status
        ```
* **Code Editor:** Visual Studio Code (VS Code) is highly recommended due to its excellent JavaScript support and extensions.

## Step-by-Step Setup

Let's build a simple MERN application.

### Step 1: Set up the Backend (Node.js & Express.js)

1.  **Create a Project Folder:**
    ```bash
    mkdir mern-app
    cd mern-app
    ```

2.  **Initialize Node.js Project:**
    This creates a `package.json` file.
    ```bash
    npm init -y
    ```

3.  **Install Express and other dependencies:**
    * `express`: The web framework.
    * `mongoose`: An Object Data Modeling (ODM) library for MongoDB and Node.js, making it easier to interact with your database.
    * `dotenv`: To load environment variables from a `.env` file.
    * `cors`: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing).

    ```bash
    npm install express mongoose dotenv cors
    ```

4.  **Create `server.js` (or `app.js`) in the root of your project:**
    ```bash
    nano server.js
    ```
    Add your server-side code to this file.

5.  **Create a `.env` file in the root of your project:**
    ```bash
    nano .env
    ```
    Add your environment variables:
    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/mern_db
    ```
    **Note:** Make sure your MongoDB server (`mongod`) is running. If not, start it (e.g., by typing `mongod` in your terminal).

6.  **Add a start script to `package.json`:**
    ```json
    "scripts": {
      "start": "node server.js"
    }
    ```

7.  **Run the backend:**
    ```bash
    npm start
    ```
    You should see "Server is running on port: 5000" and "MongoDB connected successfully!" in your console. You can visit `http://localhost:5000` in your browser to see "Hello from the MERN backend!".

### Step 2: Create a Simple API with Mongoose

Let's create a simple API for "items".

1.  **Create a `models` folder and `item.model.js` inside it:**
    ```bash
    mkdir models
    nano models/item.model.js
    ```
    This file will define your MongoDB schema for items.

2.  **Create a `routes` folder and `items.js` inside it:**
    ```bash
    mkdir routes
    nano routes/items.js
    ```
    This file will define your API routes for items.

3.  **Integrate routes into `server.js`:**
    Add the following lines to your `server.js` file:
    ```javascript
    const itemsRouter = require('./routes/items');
    app.use('/items', itemsRouter); // All requests to /items will use itemsRouter
    ```
    Now restart your backend (`Ctrl+C` then `npm start`). You can test these API endpoints using tools like Postman or Insomnia.

### Step 3: Set up the Frontend (React)

1.  **Create React App (outside your backend folder, but within `mern-app`):**
    ```bash
    cd .. # Go back to mern-app
    npx create-react-app client
    cd client
    ```
    You may see some deprecation warnings during this step (e.g., about `create-react-app` being deprecated), which is normal. You should see "Success! Created client at /home/juiho/Documents/mern-app/client".

2.  **Install Axios (for making HTTP requests):**
    ```bash
    npm install axios
    ```

3.  **Modify `client/src/App.js` to fetch and display items:**
    ```bash
    nano src/App.js
    ```
    Update this file with your React component logic to interact with your backend API.

4.  **Run the React frontend:**
    ```bash
    npm start
    ```
    This will open your React app in your browser, usually at `http://localhost:3000`.

## Troubleshooting

### Node.js Installation Error

If you encounter an error like "trying to overwrite '/usr/include/node/common.gypi', which is also in package libnode-dev...", follow these steps:

1.  **Clean up previous Node.js related packages:**
    The error specifically mentions `libnode-dev`. It's also good to remove `libnode72` and any other Node.js-related packages that `apt` lists as "no longer required". The `--purge` flag ensures configuration files are also removed.
    ```bash
    sudo apt remove --purge libnode-dev libnode72
    sudo apt autoremove
    ```

2.  **Clean the apt cache:**
    This removes the partially downloaded or problematic `.deb` file that caused the error.
    ```bash
    sudo apt clean
    ```

3.  **Update your package list (again, to ensure everything is fresh):**
    ```bash
    sudo apt update
    ```

4.  **Install Node.js (this time, it should work smoothly):**
    ```bash
    sudo apt install -y nodejs
    ```

5.  **Verify your installation:**
    ```bash
    node -v
    npm -v
    ```

## Project Structure

After following all steps, your project structure should look something like this:

```text
mern-app/
├── client/                 <-- Your new React frontend app
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ... (other React files)
├── node_modules/           <-- Your backend node_modules
├── models/
│   └── item.model.js
├── routes/
│   └── item.routes.js
├── package.json            <-- Your backend package.json
├── server.js
├── .env
```