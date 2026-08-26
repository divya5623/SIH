import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ComplaintProvider } from './context/ComplaintContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ComplaintProvider>
        <App />
      </ComplaintProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
