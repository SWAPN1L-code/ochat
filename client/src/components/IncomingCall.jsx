import React, { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import { useConnectWebRtc } from "../context/WebRtcContext";

export default function IncomingCall({ active, incomingOffer }) {
  const [offererUser, setOffererUser] = useState(null);
  const { currentUserChats } = useChat();
  const { handleAnswerOffer, handleHangup, audioRef } = useConnectWebRtc();
  useEffect(() => {
    const res = currentUserChats?.flatMap((chat) =>
      chat.participants?.filter((p) => p._id === incomingOffer?.offererUserId)
    )[0];
    setOffererUser(res);
  }, [incomingOffer]);

  return (
    <div
      className={`${
        active ? "" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 backdrop-blur-sm`}
    >
      <div className="bg-white dark:bg-backgroundDark2 dark:text-text_dark_primary rounded-lg p-8 shadow-2xl text-center max-w-md w-full mx-4">
        <h2 className="text-xl font-medium mb-6 text-text_light_primary dark:text-text_dark_primary">Incoming Video Call</h2>
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative mb-4">
            <img
              className="size-28 rounded-full object-cover border-4 border-primary shadow-lg"
              src={offererUser?.avatarUrl}
              loading="lazy"
              alt=""
            />
            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full border-4 border-white dark:border-backgroundDark2"></div>
          </div>
          <p className="text-xl font-medium text-text_light_primary dark:text-text_dark_primary mb-1">{offererUser?.username}</p>
          <p className="text-sm text-text_light_secondary dark:text-text_dark_secondary">is calling you...</p>
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleAnswerOffer(incomingOffer)}
            className="bg-primary hover:bg-primary_hover text-white text-sm font-medium py-2.5 px-6 rounded-md transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleHangup}
            className="bg-red-500 text-white text-sm font-medium py-2.5 px-6 rounded-md hover:bg-red-600 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
