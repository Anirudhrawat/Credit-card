import React from 'react';
import './loading'; 
import loader from '../../Photos/loading-buffering.gif'; 

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loader} alt="loading" className="spinner" />
    </div>
  );
}

export default Loading;