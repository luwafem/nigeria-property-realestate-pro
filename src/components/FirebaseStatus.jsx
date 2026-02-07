// src/components/FirebaseStatus.jsx
const FirebaseStatus = ({ status }) => {
  if (status === null || status === true) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Warning: Firebase Connection</p>
      <p>Firebase is not connected. Some features may not work properly.</p>
    </div>
  );
};

export default FirebaseStatus;