'use client'

import { useState } from 'react';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // You can show a message or redirect after logging out
        window.location.href = "/"; // Redirect to the homepage or login page
      } else {
        console.log('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      console.log('An error occurred while logging out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${
        loading
          ? 'bg-green-500 cursor-wait'
          : 'bg-blue-500 hover:bg-blue-700'
      } text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed`}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
