const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded data parsing

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'User_Form'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log("Connected to the database...");
});

// Serve the HTML form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'details.html')); // Serve the HTML file
});

// Handle form submission
app.post("/", (req, res) => {
    const { fname, lname, gender, age } = req.body;

    // Inserting data into the database
    const query = 'INSERT INTO users (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)';
    db.query(query, [fname, lname, gender, age], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database insertion error!!");
        }
        // Responding with a success message
        res.send(`<h1>Data Insertion Successful!</h1>
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Age:</strong> ${age}</p>
            <a href="/">Go Back</a>`);
    });
});


app.listen(3000, (err)=> {
    if (err) throw err;
    console.log("Server running on port 3000...");
});
