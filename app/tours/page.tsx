import React from 'react';
import "./ToursList.css";
const ToursList = () => {
  return (
    <div>
      <h1>Here are some createed tours!</h1>
      <div className="tours-list">
        <div className="tour">
          <h1>Tour 1</h1>
          <p>This is the first tour</p>
          <img src="https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg?s=612x612&w=0&k=20&c=JVBBZT2uquZbfY0njYHv8vkLfatoM4COJc-lX5QKYpE=" 
          alt="ggbridge" />
        </div>
        <div className="tour">
          <h1>Tour 2</h1>
          <p>This is the second tour</p>
          <img src="https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg?s=612x612&w=0&k=20&c=JVBBZT2uquZbfY0njYHv8vkLfatoM4COJc-lX5QKYpE=" 
          alt="ggbridge" />
        </div>
        <div className="tour">
          <h1>Tour 3</h1>
          <p>This is the third tour</p>
          <img src="https://media.istockphoto.com/id/1136437406/photo/san-francisco-skyline-with-oakland-bay-bridge-at-sunset-california-usa.jpg?s=612x612&w=0&k=20&c=JVBBZT2uquZbfY0njYHv8vkLfatoM4COJc-lX5QKYpE=" 
          alt="ggbridge" />
        </div>
      </div>
    </div>
  );
};

export default ToursList;
