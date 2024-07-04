const express = require("express");
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pranjal@12345",
    database: "account"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    const sqlCheck = 'SELECT * FROM users WHERE email = ?';
    db.query(sqlCheck, [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.status(409).json({ message: 'User already exists' });
        } else {
            const sqlInsert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(sqlInsert, [name, email, password], (err, result) => {
                if (err) throw err;
                res.status(201).json({ message: 'User created successfully' });
            });
        }
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT *  FROM users WHERE email = ? AND password = ?";
    const values = [
       
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("Error");
        }
       if(data.length > 0 ) {
        return res.json("Success");
       }
       else {
        return res.json("Failed");
       }
    })
})


 app.post('/google-login', (req, res) => {
    const { email, name } = req.body;
    const sql = 'INSERT INTO user (email, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)';
    db.query(sql, [email, name], (err, result) => {
        if (err) {
            console.error('Error inserting user data: ', err);
            res.status(500).send('Error inserting user data');
            return;
        }
        res.send('User data stored successfully');
    });
}); 



app.post('/save-user-info', (req, res) => {
    const { firstName, lastName, mobileNumber, address } = req.body;

    
    const query = `INSERT INTO user_info (first_name, last_name, mobile_number, address) VALUES (?, ?, ?, ?)`;
    db.query(query, [firstName, lastName, mobileNumber, address], (err, result) => {
        if (err) {
            console.error('Error saving user info: ' + err.stack);
            res.status(500).send('Server error');
            return;
        }
        console.log('User info saved successfully');
        res.send('User info saved successfully');
    });
});

app.listen(port, () => {
    console.log("Listening on port", port);
});
