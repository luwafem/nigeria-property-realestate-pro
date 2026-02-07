// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { initializeFirebase } from './services/firebase';
import Layout from './components/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import CMS from './pages/admin/CMS';
import CMSLogin from './pages/admin/CMSLogin';
import './App.css';

function App() {
  const [firebaseStatus, setFirebaseStatus] = useState({
    loading: true,
    success: false,
    message: 'Initializing Firebase...'
  });

  useEffect(() => {
    const initApp = async () => {
      console.log('Starting Firebase initialization...');
      const result = await initializeFirebase();
      
      setFirebaseStatus({
        loading: false,
        success: result.success,
        message: result.message
      });

      if (result.success) {
        console.log('✅ App initialized successfully');
      } else {
        console.error('❌ App initialization failed:', result.message);
      }
    };

    initApp();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {/* Show loading/status indicator */}
          {firebaseStatus.loading && (
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-lg text-gray-700">{firebaseStatus.message}</p>
              </div>
            </div>
          )}
          
          {!firebaseStatus.loading && !firebaseStatus.success && (
            <div className="fixed inset-0 bg-red-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Issue</h2>
                <p className="text-gray-600 mb-6">{firebaseStatus.message}</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
                  <p className="text-sm">
                    <strong>Note:</strong> The app will continue in offline mode. 
                    Some features may be limited.
                  </p>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<Layout firebaseStatus={firebaseStatus} />}>
              <Route index element={<Home />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyDetails />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="admin/login" element={<CMSLogin />} />
              <Route path="admin/dashboard" element={<CMS />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;