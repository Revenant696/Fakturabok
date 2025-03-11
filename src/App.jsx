import React, { useState } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [formData, setFormData] = useState({
    creditor: '',
    invoiceNumber: '',
    amount: '',
    date: ''
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({
      creditor: '',
      invoiceNumber: '',
      amount: '',
      date: ''
    });
    setShowPopup(false);
  };

  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="theme-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          Dark Mode
        </label>
      </div>
      
      <h1>Invoice Management</h1>
      <button onClick={() => setShowPopup(true)}>Add New Invoice</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Enter Invoice Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Creditor</label>
                <select
                  name="creditor"
                  value={formData.creditor}
                  onChange={(e) => setFormData({...formData, creditor: e.target.value})}
                  required
                >
                  <option value="">Select Creditor</option>
                  <option value="Supplier A">Supplier A</option>
                  <option value="Supplier B">Supplier B</option>
                </select>
              </div>

              <div className="form-group">
                <label>Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="entries-list">
        <h2>Previous Entries</h2>
        {entries.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Creditor</th>
                <th>Invoice Number</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.creditor}</td>
                  <td>{entry.invoiceNumber}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No entries yet</p>
        )}
      </div>
    </div>
  );
}

export default App;
