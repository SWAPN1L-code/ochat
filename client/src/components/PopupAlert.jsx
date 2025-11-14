import React, { useState } from "react";

const PopupAlert = ({ open, message }) => {
  const [isOpen, setIsOpen] = useState(open || false);

  const toggleAlert = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-backgroundDark2 p-8 rounded-xl shadow-2xl text-center max-w-sm w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Alert</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">{message || "This is an alert message."}</p>
            <button
              onClick={toggleAlert}
              className="bg-primary hover:bg-primary_hover text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupAlert;
