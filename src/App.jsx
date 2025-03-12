import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [entries, setEntries] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [vesselList, setVesselList] = useState(['Vessel A', 'Vessel B']);
  const popupRef = useRef(null);

  const [formData, setFormData] = useState({
    creditor: '',
    invoiceNumber: '',
    amount: '',
    date: '',
    vesselName: '',
    vesselNumber: '',
    bookkeeping: '',
    addedToDA: false,
    note: ''
  });

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  const handleVesselNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}(\/\d{0,2})?$/.test(value)) {
      setFormData({...formData, vesselNumber: value});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, formData]);
    setFormData({
      creditor: '',
      invoiceNumber: '',
      amount: '',
      date: '',
      vesselName: '',
      vesselNumber: '',
      bookkeeping: '',
      addedToDA: false,
      note: ''
    });
    setShowPopup(false);
  };

  const addNewVessel = (newVessel) => {
    if (!vesselList.includes(newVessel)) {
      setVesselList([...vesselList, newVessel]);
    }
  };

  return (
    <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="theme-toggle">
        <span className="theme-icon">
          {isDarkTheme ? '🌙' : '☀️'}
        </span>
        <label className="theme-switch">
          <input 
            type="checkbox" 
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <span className="slider"></span>
        </label>
      </div>
      
      <h1>Invoice Management</h1>
      <button onClick={() => setShowPopup(true)}>Add New Invoice</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
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

              <div className="form-group">
                <label>Vessel Name</label>
                <div className="vessel-search">
                  <input
                    type="text"
                    list="vessel-list"
                    value={formData.vesselName}
                    onChange={(e) => setFormData({...formData, vesselName: e.target.value})}
                    placeholder="Search or add new vessel"
                  />
                  <datalist id="vessel-list">
                    {vesselList.map((vessel, index) => (
                      <option key={index} value={vessel} />
                    ))}
                  </datalist>
                  <button 
                    type="button" 
                    onClick={() => addNewVessel(formData.vesselName)}
                    disabled={!formData.vesselName || vesselList.includes(formData.vesselName)}
                  >
                    Add New
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Vessel Number</label>
                <input
                  type="text"
                  name="vesselNumber"
                  value={formData.vesselNumber}
                  onChange={handleVesselNumberChange}
                  placeholder="123/23"
                  pattern="\d{3}/\d{2}"
                  required
                />
              </div>

              <div className="form-group">
                <label>Bookkeeping Date</label>
                <input
                  type="date"
                  name="bookkeeping"
                  value={formData.bookkeeping}
                  onChange={(e) => setFormData({...formData, bookkeeping: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Added to DA</label>
                <select
                  name="addedToDA"
                  value={formData.addedToDA}
                  onChange={(e) => setFormData({...formData, addedToDA: e.target.value === 'true'})}
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={(e) => setFormData({...formData, note: e.target.value})}
                  rows="4"
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
                <th>Vessel Name</th>
                <th>Vessel Number</th>
                <th>Bookkeeping</th>
                <th>Added to DA</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.creditor}</td>
                  <td>{entry.invoiceNumber}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.date}</td>
                  <td>{entry.vesselName}</td>
                  <td>{entry.vesselNumber}</td>
                  <td>{entry.bookkeeping}</td>
                  <td>{entry.addedToDA ? 'Yes' : 'No'}</td>
                  <td>{entry.note}</td>
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
