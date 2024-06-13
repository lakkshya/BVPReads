import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BagBookContextProvider } from './context/BagBookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BagBookContextProvider>
        <App />
      </BagBookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);