import React from 'react';
import "./ToursList.css";
const ToursList = () => {
  return (
  <div className="tours-list">
    <div className="tour-container">
      <h1 className='tour-title'>Tour 1</h1>
      <div className="tour-content">
        <p>This is the first tour</p>
        <img className='tour-image' src="https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg?s=612x612&w=0&k=20&c=JVBBZT2uquZbfY0njYHv8vkLfatoM4COJc-lX5QKYpE=" alt="ggbridge" />
      </div>
    </div>
  </div>
  );
};

export default ToursList;
