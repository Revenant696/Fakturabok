import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    creditor: '',
    invoiceNumber: '',
    amount: '',
    date: ''
  });
  const [currentField, setCurrentField] = useState(0);
  const fieldsOrder = ['creditor', 'invoiceNumber', 'amount', 'date'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCurrentField(prev => (prev < fieldsOrder.length - 1 ? prev + 1 : 0));
    }
  };

  const renderField = () => {
    const fieldName = fieldsOrder[currentField];
    switch (fieldName) {
      case 'creditor':
        return (
          <div className="form-group field-animation">
            <label>Creditor</label>
            <select 
              name="creditor"
              value={formData.creditor} 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              autoFocus
            >
              <option value="">Select Creditor</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
            </select>
          </div>
        );

      case 'invoiceNumber':
        return (
          <div className="form-group field-animation">
            <label>Invoice Number</label>
            <input 
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber} 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Invoice Number" 
              required
              autoFocus
            />
          </div>
        );

      case 'amount':
        return (
          <div className="form-group field-animation">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Amount"
              required
              autoFocus
            />
          </div>
        );

      case 'date':
        return (
          <div className="form-group field-animation">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
              autoFocus
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <h1>Invoice Entry</h1>
      <form>
        {renderField()}
      </form>
    </div>
  );
}

export default App;
