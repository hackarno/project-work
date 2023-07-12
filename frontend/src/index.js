import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConversationsContextProvider } from './context/ConversationContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConversationsContextProvider>
        <App />
      </ConversationsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
