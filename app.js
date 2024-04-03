// Import the 'mysql' module to enable communication with the MySQL database
const mysql = require("mysql");

// Import the 'express' module to create a web server
const express = require("express");

// Import the 'express-session' module to manage user sessions
const session = require("express-session");

// Import the 'path' module to handle file paths
const path = require("path");
const { connect } = require("http2");

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

  if (username && password) {
    // Execute SQL query to check if the account exists
    connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username],
      function (error, results, fields) {
        if (error) {
          response.status(500).json({
            success: false,
            message: "Database error occurred",
            error: error,
          });
          return;
        }

        // If the account exists
        if (results.length > 0) {
          // Execute another SQL query to verify the password
          connection.query(
            "SELECT * FROM accounts WHERE username = ? AND password = ?",
            [username, password],
            function (error, results, fields) {
              if (error) {
                response.status(500).json({
                  success: false,
                  message: "Database error occurred",
                  error: error,
                });
                return;
              }

              // If the password matches
              if (results.length > 0) {
                // Set session variables and send success response
                request.session.loggedin = true;
                request.session.username = username;
                response.json({ success: true });
              } else {
                // If password doesn't match, send authentication failure response
                response.status(401).json({
                  success: false,
                  message: "Incorrect password.",
                });
              }
              response.end(); // Ensure response is sent after all database operations
            }
          );
        } else {
          // If account doesn't exist, send authentication failure response
          response.status(401).json({
            success: false,
            message: "Account does not exist.",
          });
          response.end(); // Ensure response is sent after all database operations
        }
      }
    );
  } else {
    // If username or password is missing, send appropriate response
    response.status(400).json({
      success: false,
      message: "Please enter Username and Password!",
    });
    response.end(); // Ensure response is sent after all database operations
  }
});

// http://localhost:3000/register
app.post("/register", function (request, response) {
  let username = request.body.username;
  let email = request.body.email;
  let password = request.body.password;

  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          response.status(401).json({
            success: false,
            message: "User already exists",
          });
        } else {
          //code for insertion
          connection.query(
            "INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)",
            [username, password, email],
            function (error, results, fields) {
              if (error) {
                response.status(500).json({
                  success: false,
                  message: "Error inserting into accounts",
                  error: error,
                });
                return;
              }

              // Code for successful insertion
              request.session.loggedin = true;
              request.session.username = username;
              response.json({ success: true });
            }
          );
        }
      }
    );
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
