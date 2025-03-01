import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Register.css';

const Register = () => {
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // יצירת פונקציה להפניה

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = {
            id_number: idNumber,
            email,
            phone,
            first_name: firstName,
            last_name: lastName,
            username,
            password,
            role
        };

        try {
            const response = await fetch('http://localhost:8801/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });

            const data = await response.json();

            if (response.status === 200) {
                setSuccessMessage('ההרשמה בוצעה בהצלחה. מנותבים להתחברות...');
                setTimeout(() => {
                    navigate('/login'); // הפניה לעמוד ה-Login
                }, 3000); // 3 שניות לפני ההפניה
            } else {
                setErrorMessage(data.message || 'שגיאה בהרשמה');
            }
        } catch (error) {
            console.error('שגיאה:', error);
            setErrorMessage('משהו השתבש. אנא נסה שוב מאוחר יותר.');
        }
    };

    return (
        <div className="register-container">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <label>
                    מספר תעודת זהות (9 ספרות)
                    <input
                        type="text"
                        name="idNumber"
                        placeholder="מספר תעודת זהות"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    דוא"ל
                    <input
                        type="email"
                        name="email"
                        placeholder="דואר אלקטרוני"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    טלפון
                    <input
                        type="text"
                        name="phone"
                        placeholder="טלפון"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    שם פרטי
                    <input
                        type="text"
                        name="firstName"
                        placeholder="שם פרטי"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    שם משפחה
                    <input
                        type="text"
                        name="lastName"
                        placeholder="שם משפחה"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    שם משתמש
                    <input
                        type="text"
                        name="username"
                        placeholder="שם משתמש"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    סיסמה
                    <input
                        type="password"
                        name="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <label>
                    תפקיד
                    <input
                        type="text"
                        name="role"
                        placeholder="תפקיד"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="register-input"
                        required
                    />
                </label>
                <button type="submit" className="register-button">הירשם</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default Register;
