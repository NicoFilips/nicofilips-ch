import React from 'react';
import './CircleImage.css';
import image from './IMG_5340-2.jpg';

const CircleImage: React.FC = () => {
    return (
      <div className="circle-image-container">
        <img src={image} alt="Thats me" className="circle-image" width={300} height={200}/>
      </div>
    );
  };

export default CircleImage;