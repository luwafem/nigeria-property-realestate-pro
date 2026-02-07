// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FirebaseStatus from './FirebaseStatus';

const Layout = ({ firebaseStatus }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <FirebaseStatus status={firebaseStatus} />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;