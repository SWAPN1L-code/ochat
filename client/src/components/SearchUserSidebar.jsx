import React, { useRef } from "react";
import { BiSearch, profile } from "../assets";
import { limitChar } from "../utils";
import { getAvailableUsers } from "../api";
import { useChat } from "../context/ChatContext";

const SearchedUsersResultCard = ({ user }) => {
  const { setOpenAddChat, setNewChatUser } = useChat();

  const handleCreateChatClick = () => {
    setNewChatUser(user);
    setOpenAddChat(true);
  };

  return (
    <div className="flex justify-between p-3 hover:bg-backgroundLight2 dark:hover:bg-backgroundDark3 items-center w-full cursor-pointer border-b border-border_light dark:border-border_dark">
      <div className="flex gap-3 items-center flex-1">
        <img
          className="size-12 rounded-full object-cover"
          src={user.avatarUrl}
          alt={user.username}
          loading="lazy"
        />
        <div>
          <h3 className="font-medium text-sm text-text_light_primary dark:text-text_dark_primary">
            {user.username}
          </h3>
          <p className="text-xs text-text_light_secondary dark:text-text_dark_secondary">
            {user.email}
          </p>
        </div>
      </div>
      <button
        onClick={handleCreateChatClick}
        className="bg-primary hover:bg-primary_hover text-white text-xs font-medium rounded-md px-3 py-1.5 cursor-pointer transition-colors"
      >
        Chat
      </button>
    </div>
  );
};

export default function SearchUserSidebar() {
  const searchInputRef = useRef();

  // useChat hook
  const { searchedUsers, setSearchedUsers } = useChat();

  const searchUsers = async () => {
    const { data } = await getAvailableUsers(searchInputRef.current.value);
    setSearchedUsers(data.data?.users || []);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchUsers();
    }
    if (!searchInputRef.current.value.trim()) {
      setSearchedUsers(null);
    }
  };
  return (
    <div className="w-full h-full">
      {/* WhatsApp Style Header */}
      <div className="bg-backgroundLight1 dark:bg-backgroundDark2 px-4 py-3 border-b border-border_light dark:border-border_dark">
        <h1 className="text-text_light_primary font-medium text-lg dark:text-text_dark_primary mb-3">
          New Chat
        </h1>
        <div className="flex items-center gap-2 bg-backgroundLight2 dark:bg-backgroundDark3 px-3 py-2 rounded-lg">
          <div className="text-lg text-text_light_secondary dark:text-text_dark_secondary">
            <BiSearch />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none px-1 w-full text-sm text-text_light_primary dark:text-text_dark_primary placeholder-text_light_secondary dark:placeholder-text_dark_secondary"
            placeholder="Search by email or username"
            ref={searchInputRef}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <h1 className="text-black font-medium text-xl dark:text-white">
            {searchUsers?.length ? "Search Results" : ""}
          </h1>
          <div className="recentUserChats h-[calc(100vh-170px)] md:h-[calc(100vh-280px)] overflow-auto ">
            {!searchedUsers ? (
              <h2 className="text-center text-sm text-text_light_secondary dark:text-text_dark_secondary">
                create a chat with friends by searching them !
              </h2>
            ) : !searchedUsers.length ? (
              <h2 className="text-center text-sm text-text_light_secondary dark:text-text_dark_secondary">
                No users found{" "}
              </h2>
            ) : (
              searchedUsers?.map((user) => (
                <SearchedUsersResultCard key={user._id} user={user} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
