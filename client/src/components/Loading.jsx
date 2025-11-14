import React from "react";

const Loading = () => {
  return (
    <>
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          width: 15px;
          aspect-ratio: 1;
          border-radius: 50%;
          animation: l5 1s infinite linear alternate;
        }

        @keyframes l5 {
          0% {
            box-shadow: 20px 0 #25D366, -20px 0 #25D36622;
            background: #25D366;
          }
          33% {
            box-shadow: 20px 0 #25D366, -20px 0 #25D36622;
            background: #25D36622;
          }
          66% {
            box-shadow: 20px 0 #25D36622, -20px 0 #25D366;
            background: #25D36622;
          }
          100% {
            box-shadow: 20px 0 #25D36622, -20px 0 #25D366;
            background: #25D366;
          }
        }
      `}</style>
    </>
  );
};

export default Loading;
