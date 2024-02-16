import React from 'react';
import { Resizable } from 'react-resizable';

const Resize = () => {
  const handleResize = (index, { size }) => {
    // Handle resize logic here
    // You can update state or perform any other actions based on the new size
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Div (30%) */}
      <Resizable
        className="resize-handle"
        defaultSize={{ width: '30%', height: '100%' }}
        minWidth={100}
        maxWidth="70%"
        onResize={(e, data) => handleResize(0, data)}
      >
        <div className="bg-blue-500 h-full">Left Div</div>
      </Resizable>

      {/* Right Div (70%) */}
      <Resizable
        className="resize-handle"
        defaultSize={{ width: '70%', height: '100%' }}
        minWidth={100}
        onResize={(e, data) => handleResize(1, data)}
      >
        <div className="bg-green-500 h-full">Right Div</div>
      </Resizable>
    </div>
  );
};

export default Resize;
