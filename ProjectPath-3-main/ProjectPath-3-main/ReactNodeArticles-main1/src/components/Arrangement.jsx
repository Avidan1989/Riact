import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../assets/styles/Arrangement.css'

function Arrangement() {
  const [shifts, setShifts] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("אנא בחר קובץ להעלאה");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Data from Excel sheet:", jsonData);
      
      // עדכון המפתחות בהתאם לשמות בעמודות בקובץ האקסל שלך
      setShifts(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h1>סידור עבודה</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>הוסף את הנתונים לטבלה</button>

      <table>
        <thead>
          <tr>
            <th>יום</th>
            <th>שם עובד</th>
            <th>תאריך</th>
            <th>שעות</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length > 0 ? (
            shifts.map((shift, index) => (
              <tr key={index}>
                <td>{shift["יום"] || 'לא נמצא'}</td> {/* עדכון המפתח ל"יום" */}
                <td>{shift["שם עובד"] || 'לא נמצא'}</td> {/* עדכון המפתח ל"שם עובד" */}
                <td>{shift["תאריך"] || 'לא נמצא'}</td> {/* עדכון המפתח ל"תאריך" */}
                <td>{shift["שעות"] || 'לא נמצא'}</td> {/* עדכון המפתח ל"שעות" */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">לא נמצאו נתונים להציג.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Arrangement;
