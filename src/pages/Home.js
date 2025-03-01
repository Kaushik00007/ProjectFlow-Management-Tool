import React from 'react';

const Home = ({ darkMode }) => {
  return (
    <div style={{ padding: '20px', color: darkMode ? '#ffffff' : '#000000' }}>
      <h1>Welcome to the Project Management Tool</h1>
      <p>Manage your projects efficiently...</p>
    </div>
  );
};

export default Home;