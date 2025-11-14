import React, { useEffect, useState } from "react";
import { BiSearch } from "../assets";
import { LocalStorage } from "../utils";
import { useChat } from "../context/ChatContext";
import RecentUserChatCard from "./RecentUserChatCard";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";

export default function RecentChatsSidebar() {
  const {
    currentUserChats,
    loadingChats,
    getCurrentUserChats,
    setMessages,
    getMessages,
    currentSelectedChat,
    isChatSelected,
    setIsChatSelected,
  } = useChat();
  const { user } = useAuth();

  const [filteredRecentUserChats, setFilteredRecentUserChats] = useState(null);

  const getFilteredRecentChats = (e) => {
    const { value } = e.target;
    const usernameRegex = new RegExp(value, "i");

    if (value.trim() === "") {
      setFilteredRecentUserChats(currentUserChats);
    } else {
      setFilteredRecentUserChats(
        currentUserChats.filter((chat) => {
          if (chat?.isGroupChat) {
            return usernameRegex.test(chat.name);
          } else {
            return chat.participants.some((participant) => {
              if (participant._id === user._id) return false;

              return usernameRegex.test(participant.username);
            });
          }
        })
      );
    }
  };

  useEffect(() => {
    setFilteredRecentUserChats(currentUserChats);
  }, [currentUserChats]);

  useEffect(() => {
    // fetch the current user chats
    getCurrentUserChats();
  }, []);

  return (
    <div
      className={`w-full h-full md:${
        isChatSelected ? "hidden" : "block"
      }`}
    >
      {/* WhatsApp Style Header */}
      <div className="bg-backgroundLight1 dark:bg-backgroundDark2 px-4 py-3 border-b border-border_light dark:border-border_dark">
        <h1 className="text-text_light_primary font-medium text-lg dark:text-text_dark_primary mb-3">
          Chats
        </h1>
        <div className="flex items-center gap-2 bg-backgroundLight2 dark:bg-backgroundDark3 px-3 py-2 rounded-lg">
          <div className="text-lg text-text_light_secondary dark:text-text_dark_secondary">
            <BiSearch />
          </div>
          <input
            type="text"
            onChange={getFilteredRecentChats}
            className="bg-transparent outline-none px-1 w-full text-sm text-text_light_primary dark:text-text_dark_primary placeholder-text_light_secondary dark:placeholder-text_dark_secondary"
            placeholder="Search or start new chat"
          />
        </div>
      </div>
      
      <div className="chat-list bg-backgroundLight1 dark:bg-backgroundDark2">

        {loadingChats ? (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <Loading />
          </div>
        ) : currentUserChats?.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-96 px-8">
            <p className="text-text_light_secondary dark:text-text_dark_secondary text-center">
              No chats yet. Start a conversation!
            </p>
          </div>
        ) : (
          <div className="recentUserChats overflow-auto h-[calc(100vh-200px)] md:h-[calc(100vh-280px)]">
            {filteredRecentUserChats?.map((chat) => (
              <RecentUserChatCard
                key={chat._id}
                chat={chat}
                isActive={currentSelectedChat.current?._id === chat._id}
                onClick={(chat) => {
                  if (
                    currentSelectedChat.current?._id &&
                    currentSelectedChat.current?._id === chat?._id
                  )
                    return;
                  LocalStorage.set("currentSelectedChat", chat);
                  currentSelectedChat.current = chat;
                  setIsChatSelected(true);
                  setMessages([]);
                  getMessages(currentSelectedChat.current?._id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
