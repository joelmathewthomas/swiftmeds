// Import the 'mysql' module to enable communication with the MySQL database
const mysql = require("mysql");

// Import the 'express' module to create a web server
const express = require("express");

// Import the 'express-session' module to manage user sessions
const session = require("express-session");

// Import the 'path' module to handle file paths
const path = require("path");

// Create a MySQL connection
const connection = mysql.createConnection({
  // Database host
  host: "localhost",
  // Database username
  user: "swiftmeds",
  // Database password
  password: "swiftmeds@123",
  // Database name
  database: "swiftmeds",
});

//Initialize express
const app = express();
app.use(
  session({
    secret: "a248afd4e47050851c870a4223d27146eebc5fc2d07da83c9d741af0ff641ae7",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));

// http://localhost:3000/
app.get("/", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/index.html"));
});

// http://localhost:3000/auth
app.post("/auth", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;
          // Redirect to home page
          response.json({ success: true });
        } else {
          response.status(401).json({
            success: false,
            message: "Incorrect username or password.",
          });
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

// http://localhost:3000/home
app.get("/home", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  response.end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
