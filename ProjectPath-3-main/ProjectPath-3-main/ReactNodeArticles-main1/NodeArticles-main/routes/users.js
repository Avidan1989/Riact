const express = require('express');
const jwt = require('jsonwebtoken'); // ליצירת token
const bcrypt = require('bcrypt'); // להצפנת סיסמאות
const dbSingleton = require('../dbSingleton');
const db = dbSingleton.getConnection('products_db');
const router = express.Router();

// *** Route for user registration ***
router.post('/register', async (req, res) => {
    const { id_number, email, phone, first_name, last_name, username, password, role } = req.body;

    // בדיקה אם כל השדות נשלחו
    if (!id_number || !email || !phone || !first_name || !last_name || !username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // בדוק אם המשתמש כבר קיים לפי שם משתמש או מייל
        const queryCheck = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(queryCheck, [username, email], async (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // יצירת hash לסיסמה
            const passwordHash = await bcrypt.hash(password, 10); // יצירת הצפנה עם 10 salt rounds

            // הוספת המשתמש החדש לבסיס הנתונים
            const queryInsert = `
                INSERT INTO users (id_number, email, phone, first_name, last_name, username, password_hash, role)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(queryInsert, [id_number, email, phone, first_name, last_name, username, passwordHash, role], (err, results) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ message: 'Error inserting user' });
                }

                // החזרת תשובה אם ההרשמה הצליחה
                res.status(201).json({
                    message: 'User registered successfully',
                    userId: results.insertId,
                    username,
                    email
                });
            });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// *** Route for user login ***
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // בדיקה אם כל השדות נשלחו
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // שאילתת SQL לשלוף את פרטי המשתמש לפי שם משתמש
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        // השוואת סיסמה (השוואה של הסיסמה המוזנת מול ההצפנה מה-DB)
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // יצירת JWT token עבור המשתמש
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET || 'your_jwt_secret', // חשוב להגדיר את ה-JWT_SECRET בסביבה
            { expiresIn: '1h' }
        );

        // החזרת ה-token ללקוח
        return res.status(200).json({ message: 'Login successful', token });
    });
});

module.exports = router;
