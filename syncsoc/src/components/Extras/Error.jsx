import React from 'react';
import image from '../../assets/error.svg';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#FFFDFB] h-screen text-center">
      <img
        src={image} // Replace this with any error image link or your own image
        alt="Error"
        className="w-64 h-64 mb-8"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl text-gray-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;
