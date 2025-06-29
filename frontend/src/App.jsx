// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { HistoryProvider } from './context/HistoryContext'; // ✅ Add this line
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Layout.css';

const App = () => {
  return (
    <AuthProvider>
      <HistoryProvider> {/* ✅ Wrap inside HistoryProvider */}
        <Router>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </HistoryProvider>
    </AuthProvider>
  );
};

export default App;
