import React from "react";

export default function DesktopOnly() {
  return (
    <div className="bg-gray-100 dark:bg-backgroundDark3 text-gray-900 dark:text-white text-2xl md:text-xl font-semibold flex flex-col items-center justify-center h-screen w-full px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-3xl font-bold mb-4 text-primary">Desktop Only</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This application is currently available for desktop devices only.
        </p>
      </div>
    </div>
  );
}
