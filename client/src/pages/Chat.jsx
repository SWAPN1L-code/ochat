import React, { useState } from "react";
import SideMenu from "../components/SideMenu";
import ChatLeftSidebar from "../components/ChatLeftSidebar";
import ChatsSection from "../components/ChatsSection";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { AddChat } from "../components/AddChat";
import { useChat } from "../context/ChatContext";
import VideoChat from "../components/VideoChat";
import { useConnectWebRtc } from "../context/WebRtcContext";
import IncomingCall from "../components/IncomingCall";
import { BsFillChatRightTextFill } from "../assets";

export default function Chat() {
  const {
    currentSelectedChat,
    activeLeftSidebar,
    setActiveLeftSidebar,
    isChatSelected,
  } = useChat();
  const { showVideoComp, incomingOffer } = useConnectWebRtc();

  return (
    <>
      <div className="h-full w-full ">
        <AddChat open={true} />
        {!!incomingOffer && (
          <IncomingCall
            incomingOffer={incomingOffer}
            active={!!incomingOffer}
          />
        )}

        <VideoChat show={showVideoComp} />
        <div className="w-full h-screen md:h-[calc(100vh-120px)] flex bg-backgroundLight2 dark:bg-backgroundDark3 relative">
          <div className="h-full md:h-fit md:absolute md:bottom-0 md:w-full md:hidden">
            <SideMenu
              setActiveLeftSidebar={setActiveLeftSidebar}
              activeLeftSidebar={activeLeftSidebar}
            />
          </div>
          <div>
            <ChatLeftSidebar activeLeftSidebar={activeLeftSidebar} />
          </div>
          <div
            className={`w-full md:${
              isChatSelected && activeLeftSidebar === "recentChats"
                ? ""
                : "hidden"
            }`}
          >
            {currentSelectedChat.current?._id ? (
              <ChatsSection />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-backgroundLight1 dark:bg-backgroundDark2 border-l border-border_light dark:border-border_dark">
                <div className="text-primary text-6xl mb-4">
                  <BsFillChatRightTextFill />
                </div>
                <h1 className="text-2xl font-light text-text_light_primary dark:text-text_dark_primary mb-2">OChat Web</h1>
                <p className="text-text_light_secondary dark:text-text_dark_secondary text-sm text-center max-w-md px-4">
                  Send and receive messages without keeping your phone online.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden md:block ">
        <SideMenu
          setActiveLeftSidebar={setActiveLeftSidebar}
          activeLeftSidebar={activeLeftSidebar}
        />
      </div>
    </>
  );
}
