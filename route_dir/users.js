const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'user_form'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log("Connected to the database...");
});


// GET route to retrieve data
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Database query error!!!");
        }

        // Generate HTML table
        let html = `
            <h1>User Data</h1>
            <table border="1">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                </tr>`;

        results.forEach(user => {
            html += `
                <tr>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.gender}</td>
                    <td>${user.age}</td>
                </tr>`;
        });

        html += `</table>
            <a href="/">Go Back</a>`;

        res.send(html); // Send the complete HTML response
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});