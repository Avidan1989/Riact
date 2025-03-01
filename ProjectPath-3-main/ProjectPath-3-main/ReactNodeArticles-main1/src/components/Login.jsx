import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8801/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);  // שמירת ה-token ב-localStorage
        navigate('/main-page');  // נווט לעמוד הבית (MainPage)
      } else {
        setError(data.message);  // הצגת שגיאה אם התחברות לא הצליחה
      }
    } catch (error) {
      console.error(error);
      setError('שגיאה בהתחברות לשרת');
    }
  };

  const goToRegister = () => {
    navigate('/register');  // נווט לעמוד ההרשמה
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>סיסמה</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">התחבר</button>
        {error && <p>{error}</p>}
      </form>

      {/* כפתור לעבור לדף ההרשמה */}
      <button className="register" onClick={goToRegister}>הרשמה</button>
    </div>
  );
}

export default Login;
