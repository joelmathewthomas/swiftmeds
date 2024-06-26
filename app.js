// Import the 'mysql' module to enable communication with the MySQL database
const mysql = require("mysql");

// Import the 'path' module to handle file paths
const path = require("path");
const fs = require('fs');

// Import the 'express' module to create a web server
const express = require("express");

const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname,'public','uploads'),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, req.session.username + '-' + uniqueSuffix+ path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// Import http module
const http = require("http");

// Import socket.io
const { Server } = require("socket.io");

// Import the 'express-session' module to manage user sessions
const session = require("express-session");



const async = require("async");

// Create a MySQL connection
const connection = mysql.createPool({
  // Database host
  connectionLimit: 10,
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

const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const users = {};

// Handle Socket.IO events
io.on("connection", (socket) => {
  console.log("A user connected");

  // set user socket
  socket.on("setUsername", (username) => {
    users[username] = socket;
    console.log(
      "handling setUsername , username is ",
      username,
      ": ",
      users[username].id
    );
  });

  // consultdoctor
  socket.on("consultdoctor", ({ doctor, patient }) => {
    console.log(`Received Appointment: Doctor: ${doctor}, Patient: ${patient}`);

    // Split the doctor variable by whitespace and take the first part as the name
    const doctorNameParts = doctor.split(" ");
    const doctorName = doctorNameParts[0].trim();
    const patientSocket = users[patient].id;
    // Check if the doctor is connected
    if (users.hasOwnProperty(doctorName)) {
      // Find the doctor's socket instance and emit event to update appointments
      const doctorSocket = users[doctorName].id;
      io.to(doctorSocket).emit("updateappointments", patient);
      io.to(patientSocket).emit(
        "notify",
        `Appointment Successful. You will be redirected to chatbox when the ${doctorName} is ready to chat`
      );
      console.log(`Emitted "updateappointments" to ${doctorName}`);
    } else {
      // If the doctor is not connected, emit a notification to the patient
      io.to(patientSocket).emit("notify", `${doctorName} is not online`);
      console.log(
        `Emitted notification to ${patient} that ${doctorName} is not online`
      );
    }
  });

  socket.on("sendclicked", ({ sender, recipient, message }) => {
    console.log("recieved event sentclicked from ", sender);
    const recipientSocketId = users[recipient]?.id;
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receivemsg", { message: message });
      console.log(
        "successfulylly send event receivemsg to ",
        recipient,
        recipientSocketId,
        " message: ",
        message
      );
    } else {
      const senderSocketId = users[sender]?.id;
      if (senderSocketId) {
        io.to(senderSocketId).emit(
          "disconnected",
          "User disconnected. Going back"
        );
        setTimeout(() => {
          io.to(senderSocketId).emit("reload");
        }, 2000); // Emit reload event after 2 seconds
      }
    }
  });

  socket.on("sendIMG",({sender, recipient, file}) =>{
    console.log("SOCKET : ON sendIMG : ", sender, recipient, file);
    const recipientSocketId = users[recipient]?.id
    if(recipientSocketId){
      io.to(recipientSocketId).emit("displayRecievedIMG", {file: file});
      console.log("IO : TO : " ,recipientSocketId,"-", recipient, " ",file);
    }
    else{
      const senderSocketId = users[sender]?.id;
      if(senderSocketId){
        io.to(senderSocketId).emit(
          "disconnected",
          "User disconnected. Going back"
        );
        setTimeout(() => {
          io.to(senderSocketId).emit("reload");
        }, 2000); // Emit reload event after 2 seconds
      }
    }
  })

  socket.on("closedchat", ({ recipient }) => {
    recipientSocketId = users[recipient]?.id;
    io.to(recipientSocketId).emit(
      "disconnected",
      "User disconnected. Going back"
    );
    setTimeout(() => {
      io.to(recipientSocketId).emit("reload");
    });
  });

  socket.on("patientbusy", ({ doctor }) => {
    doctorSocketId = users[doctor]?.id;
    io.to(doctorSocketId).emit("patientinappointment");
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    // Find the username associated with the disconnected socket
    const disconnectedUser = Object.keys(users).find(
      (key) => users[key].id === socket.id
    );

    // If a matching username is found, remove it from the users object
    if (disconnectedUser) {
      delete users[disconnectedUser];
      removeUserFiles(disconnectedUser);;
      console.log(`User ${disconnectedUser} disconnected`);
    }
  });
});

function removeUserFiles(username) {
    // Assuming `username` is the username to disconnect
    
    // Directory where uploads are stored
    const uploadDir = path.join(__dirname,'public', 'uploads');

    // Read the contents of the directory
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        // Iterate through the files in the directory
        files.forEach(file => {
            // Check if the file starts with the username
            if (file.startsWith(username)) {
                // Construct the full path to the file
                const filePath = path.join(uploadDir, file);

                // Delete the file
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                        return;
                    }
                    console.log(`Deleted file: ${filePath}`);
                });
            }
        });
    });
}


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

// Start the server
server.listen(port, "localhost", () => {
  console.log(`Server is running on port ${port}`);
});

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
      "SELECT * FROM accounts WHERE BINARY username = ?",
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
            "SELECT * FROM accounts WHERE BINARY username = ? AND BINARY password = ?",
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
                connection.query(
                  "SELECT type from accounts where BINARY username = ?",
                  [username],
                  function (error, results) {
                    if (error) {
                      response.json({
                        success: false,
                        message: "Database error occured",
                        error: error,
                      });
                    } else {
                      const user = results[0];
                      request.session.type = user.type;
                      request.session.cart = [];
                      request.session.appointments = [];
                      response.json({ success: true });
                    }
                    return;
                  }
                );
                return;
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
  let type = request.body.type;
  if (type === 'doctor'){
    username = 'Dr.'+username
  }

  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE BINARY username = ?",
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
            "INSERT INTO accounts (username, password, email,type) VALUES (?, ?, ?, ?)",
            [username, password, email, type],
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
              response.json({ success: true });
            }
          );
        }
      }
    );
  }
});

// http://localhost:3000/getSessionData
app.get("/getSessionData", function (request, response) {
  if (request.session.loggedin) {
    response.json({
      success: true,
      loggedin: request.session.loggedin,
      username: request.session.username,
      type: request.session.type,
      cart: request.session.cart,
      appointments: request.session.appointments,
    });
    console.log(request.session.username, "requested session data");
  } else {
    response.json({ success: false, loggedin: request.session.loggedin });
  }
});

// http://localhost:3000/login
app.get("/login", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

// http://localhost:3000/contact
app.get("/contact", function (request, response) {
  response.sendFile(path.join(__dirname + "/contact.html"));
});

// http://localhost:3000/medicine
app.get("/medicine", function (request, response) {
  if (request.session.loggedin) {
    if (
      request.session.type === "patient" ||
      request.session.type === "admin"
    ) {
      response.sendFile(path.join(__dirname + "/medicine.html"));
    } else {
      response.sendFile(path.join(__dirname + "/notauthorized.html"));
    }
  } else {
    response.sendFile(path.join(__dirname + "/plslogin.html"));
  }
});

// http://localhost:3000/aboutus
app.get("/aboutus", function (request, response) {
  response.sendFile(path.join(__dirname + "/aboutus.html"));
});

// http://localhost:3000/services
app.get("/services", function (request, response) {
  response.sendFile(path.join(__dirname + "/services.html"));
});

// http://localhost:3000/doctors
app.get("/doctors", function (request, response) {
  response.sendFile(path.join(__dirname + "/doctors.html"));
});

// http://localhost:3000/dashboard
app.get("/dashboard", function (request, response) {
  if (request.session.loggedin) {
    if (request.session.type == "admin") {
      response.sendFile(path.join(__dirname + "/dashboard.html"));
    } else {
      response.sendFile(path.join(__dirname + "/notauthorized.html"));
    }
  } else {
    response.sendFile(path.join(__dirname + "/plslogin.html"));
  }
});

// http://localhost:3000/logout
app.get("/logout", function (request, response) {
  if (request.session.loggedin) {
    request.session.loggedin = false;
    request.session.username = "";
    request.session.type = "";
    response.json({
      success: true,
    });
  } else {
    response.json({
      success: false,
    });
  }
});

// http://localhost:3000/getDoctors
app.get("/getDoctors", function (request, response) {
  if (request.session.loggedin) {
    if (request.session.type) {
      connection.query(
        "SELECT username from accounts where type=?",
        ["doctor"],
        function (error, results, fields) {
          if (error) {
            response.status(500).json({
              success: false,
              message: "Database error occured",
              error: error,
            });
            return;
          }

          if (results.length === 0) {
            console.log("No doctor accounts found");
            response.status(200).json({
              success: true,
              message: "No doctor accounts found",
              doctors: [], // Empty array to indicate no doctors found
            });
          } else {
            // Send the results back to the client
            response.status(200).json({
              success: true,
              message: "Doctor accounts found",
              doctors: results, // Sending the array of doctor usernames
            });
          }
        }
      );
    } else {
      response.sendFile(path.join(__dirname + "/notauthorized.html"));
    }
  } else {
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/getPatients
app.get("/getPatients", function (request, response) {
  if (request.session.loggedin) {
    if (request.session.type == "admin") {
      connection.query(
        "SELECT username from accounts where type=?",
        ["patient"],
        function (error, results, fields) {
          if (error) {
            response.status(500).json({
              success: false,
              message: "Database error occured",
              error: error,
            });
            return;
          }

          if (results.length === 0) {
            console.log("No patient accounts found");
            response.status(200).json({
              success: true,
              message: "No patient accounts found",
              patients: [], // Empty array to indicate no patients found
            });
          } else {
            // Send the results back to the client
            response.status(200).json({
              success: true,
              message: "Patient accounts found",
              patients: results, // Sending the array of patient usernames
            });
          }
        }
      );
    } else {
      response.sendFile(path.join(__dirname + "/notauthorized.html"));
    }
  } else {
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/dashboardCreateuser
app.post("/dashboardCreateuser", function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  let email = request.body.email;
  let type = request.body.type;

  if (username && password && type) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      [username],
      function (error, results) {
        if (error) throw error;
        if (results.length > 0) {
          response.status(401).json({
            success: false,
            message: "User already exists",
          });
        } else {
          connection.query(
            "INSERT INTO accounts (username, password, email, type) VALUES (?, ?, ?, ?)",
            [username, password, email, type],
            function (error) {
              if (error) {
                response.status(500).json({
                  success: false,
                  message: "Error inserting into accounts",
                  error: error,
                });
              } else {
                response.json({ success: true });
              }
              return;
            }
          );
        }
      }
    );
  }
});

// http://localhost:3000/dashboardDeleteuser
app.post("/dashboardDeleteuser", function (request, response) {
  let username = request.body.username;
  if (username) {
    connection.query(
      "SELECT username FROM accounts WHERE username=?",
      [username],
      function (error, results) {
        if (error) {
          throw error;
        }
        if (results.length == 0) {
          response.status(401).json({
            success: false,
            message: "User does not exist",
          });
        } else {
          connection.query(
            "DELETE FROM accounts WHERE username=?",
            [username],
            function (error) {
              if (error) {
                throw error;
              } else {
                response.status(501).json({
                  success: true,
                });
              }
              return;
            }
          );
        }
      }
    );
  }
});

// http://localhost:3000/getMedicines
app.get("/getMedicines", function (request, response) {
  if (request.session.loggedin) {
    //Fetch Medicine
    connection.query("SELECT * FROM medicine", function (error, results) {
      if (error) {
        response.status(500).json({ success: false, error: error });
      } else {
        response.json({ success: true, medicines: results });
      }
    });
  } else {
    // send error message
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/addtocart
app.post("/addtocart", function (request, response) {
  if (request.session.loggedin) {
    const { name } = request.body;
    const { price } = request.body;

    // Check if the item already exists in the cart
    if (request.session.cart.some((item) => item.medicine === name)) {
      return response.json({
        success: false,
      });
    }

    // Add the item to the cart
    request.session.cart.push({ medicine: name, quantity: 1, price: price });

    return response.json({ success: true });
  } else {
    return response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/updatecart
app.get("/updatecart", function (request, response) {
  const cartItems = request.session.cart;
  const cartData = [];
  if (request.session.loggedin) {
    if (cartItems.length !== 0) {
      async.eachSeries(
        cartItems,
        (item, callback) => {
          connection.query(
            "SELECT img,price FROM medicine WHERE name = ?",
            [item.medicine],
            (error, results) => {
              if (error) {
                console.error(
                  "Error fetching image URL and item price: ",
                  error
                );
                return callback(error);
              }
              if (results.length > 0) {
                cartData.push({
                  name: item.medicine,
                  img: results[0].img,
                  price: results[0].price,
                  quantity: item.quantity,
                });
              }
              callback();
            }
          );
        },
        (error) => {
          if (error) {
            return response
              .status(500)
              .json({ success: false, message: "Failed to update cart" });
          }
          // Send the response only after all items are processed
          response.json({ success: true, cart: cartData });
        }
      );
    } else {
      const emptyCart = [];
      emptyCart.push({
        name: "Empty",
        img: "antibacterialsoap.png",
        price: "0",
      });
      response.json({ success: true, cart: emptyCart });
    }
  } else {
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/deletefromcart
app.post("/deletefromcart", function (request, response) {
  if (request.session.loggedin) {
    const itemName = request.body.name;

    const cartItems = request.session.cart;
    const index = cartItems.findIndex((item) => item.medicine === itemName); // Find the index of the item with matching medicine
    if (index !== -1) {
      cartItems.splice(index, 1);
      // Update the session cart with the modified cartItems array
      request.session.cart = cartItems;
      response.json({ success: true, message: "Item removed from cart" });
    } else {
      response
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } else {
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/searchmedicines
app.post("/searchmedicines", function (request, response) {
  if (request.session.loggedin) {
    //Fetch Medicine
    const name = request.body.name;
    connection.query(
      "SELECT * FROM medicine WHERE name LIKE ?",
      [`%${name}%`],
      function (error, results) {
        if (error) {
          response.status(500).json({ success: false, error: error });
        } else {
          response.json({ success: true, medicines: results });
        }
      }
    );
  } else {
    // send error message
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/consult
app.get("/consult", function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + "/consult.html"));
  } else {
    // send error message
    response.sendFile(path.join(__dirname + "/notauthorized.html"));
  }
});

// http://localhost:3000/addAppointment
app.post("/addAppointment", (request, response) => {
  const patientName = request.body.patientName;
  console.log("Received request to add appointment for patient:", patientName);

  // Check if patientName already exists in appointments array
  if (!request.session.appointments.includes(patientName)) {
    // Patient name doesn't exist, push it to the array
    request.session.appointments.push(patientName);
    console.log(`Added appointment for patient: ${patientName}`);
    response.json({
      success: true,
      message: `Appointment added for patient: ${patientName}`,
    });
  } else {
    // Patient name already exists, log and send response
    console.log(`Appointment for patient ${patientName} already exists`);
    response.json({
      success: false,
      message: `Appointment for patient ${patientName} already exists`,
    });
  }
});

// http://localhost:3000/removeAppointment
app.post("/removeAppointment", function (request, response) {
  console.log("reached /removeAppointment");
  const doctorName = request.body.doctorName;
  const patientName = request.body.patientName;
  const mode = request.body.mode;

  if (mode === "accept") {
    console.log("mode is accept");
    // Check if the appointment exists
    const index = request.session.appointments.indexOf(patientName);
    console.log(
      "'doctor is ",
      doctorName,
      "patient is ",
      patientName,
      "mode is",
      mode
    );
    if (index !== -1) {
      // Remove the appointment
      request.session.appointments.splice(index, 1);
      console.log("removed appointment");
      var patientSocketId = undefined;
      // Notify the patient
      if (users[patientName]) {
        patientSocketId = users[patientName].id;
      }
      if (patientSocketId) {
        io.to(patientSocketId).emit("chatwithdoctor", { doctor: doctorName });
        console.log("successfully emitted chatwithdoctor");
      } else {
        console.error("Patient socket not found");
        response.json({ success: false, message: "Patient not online" });
        io.to(users[doctorName]?.id).emit(
          "notify",
          `${patientName} is not online`
        );
      }

      // Send success response
      response.json({ success: true });
    } else {
      // Appointment not found
      io.to(users[doctorName]?.id).emit(
        "notify",
        `${patientName} is not online`
      );
      io.to(users[doctorName]?.id).emit("reload");
      response.json({ success: false, message: "Appointment not found" });
    }
  } else if (mode === "reject") {
    // Reject mode
    // Check if appointment exists
    const index = request.session.appointments.indexOf(patientName);
    console.log(
      "'doctor is ",
      doctorName,
      "patient is ",
      patientName,
      "mode is",
      mode
    );
    if (index !== -1) {
      // Remove the appointment
      request.session.appointments.splice(index, 1);
      console.log("removed appointment");
      io.to(users[patientName]?.id).emit(
        "notify",
        "Your appointment was rejected"
      );
      response.json({ success: true });
    } else {
      // Appointment not found

      io.to(users[doctorName]?.id).emit("notify", "Appointment not found");
      setTimeout(() => {
        io.to(users[doctorName]?.id).emit("reload");
      }, 2100);
      response.json({ success: false, message: "Appointment not found" });
    }
  }
});

// http://localhost:3000/manipulateQuantity
app.post("/manipulateQuantity", function (request, response) {
  console.log(" manipulateQuantity got a request");
  if (request.session.loggedin) {
    medicine = request.body.medicine;
    mode = request.body.mode;

    request.session.cart.forEach((item) => {
      if (item.medicine === medicine) {
        if (mode === "increase") {
          console.log(item.quantity, item.quantity + 1);
          item.quantity = item.quantity + 1;
          console.log("type is ", typeof item.quantity);
          response.json({ success: true });
        } else if (mode === "decrease") {
          item.quantity = item.quantity - 1;
          response.json({ success: true });
        } else {
          response.json({ success: false });
        }
      }
    });
  }
});

// http://localhost:3000/payments
app.get("/payment", function (request, response) {
  if (request.session.loggedin) {
    response.sendFile(path.join(__dirname + "/payment.html"));
  }
});

// http://localhost:3000/addOrder
app.post("/addOrder", function (request, response) {
  var cost = 0;
  const medicines = [];
  const decrementArray = [];
  if (request.session.loggedin) {
    formData = request.body;
    console.log(formData);

    // Calculate total cost
    request.session.cart.forEach((item) => {
      price = item.quantity * item.price;
      cost += price;
      medicines.push(item.medicine);
      decrementArray.push(item.quantity);
    });
    cost = cost.toFixed(2);
  }

  // Corresponding decrement factors

  // Constructing the SQL query
  let sqlQuery = "UPDATE medicine SET quantity = CASE ";

  medicines.forEach((medicine, index) => {
    sqlQuery += `WHEN name = '${medicine}' THEN quantity - ${decrementArray[index]} `;
  });

  sqlQuery += `ELSE quantity + 0 END`;

  // Executing the SQL query
  if (medicines.length > 0) {
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.log("Error updating quantities:", error);
        response.json({ success: false });
      } else {
        console.log("Quantities updated successfully!");
        connection.query(
          "INSERT INTO orders (username,full_name, email, address, city, state, pin_code, card_name, card_number, exp_month, exp_year, cvv, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            request.session.username,
            formData.fullName,
            formData.email,
            formData.address,
            formData.city,
            formData.state,
            formData.pinCode,
            formData.cardName,
            formData.cardNumber,
            formData.expMonth,
            formData.expYear,
            formData.cvv,
            cost,
          ],
          (error, results, fields) => {
            if (error) {
              console.log(error);
              response.json({ success: false });
            } else {
              request.session.cart = [];
              response.json({ success: true });
            }
          }
        );
      }
    });
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log("POST /upload");
  console.log(req.file); // 'file' is the name attribute of the file input in the form
  if(req.file){
    res.json({file: req.file.filename})
  }
});