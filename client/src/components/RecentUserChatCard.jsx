import moment from "moment";
import { profile } from "../assets";
import { useAuth } from "../context/AuthContext";
import { getChatObjectMetadata, limitChar } from "../utils";

export default function RecentUserChatCard({ chat, onClick, isActive }) {
  // usercontext
  const { user } = useAuth();

  const filteredChat = getChatObjectMetadata(chat, user); // filter the chat object metadata

  return (
    <div
      onClick={() => onClick(chat)}
      className={`flex gap-3 px-4 py-3 hover:bg-backgroundLight2 dark:hover:bg-backgroundDark3 ${
        isActive ? "bg-backgroundLight2 dark:bg-backgroundDark3" : ""
      } items-center w-full cursor-pointer transition-colors border-b border-border_light dark:border-border_dark`}
    >
      {chat.isGroupChat ? (
        <div className="w-12 relative h-12 flex-shrink-0 flex justify-start items-center flex-nowrap">
          {chat.participants.slice(0, 3).map((participant, i) => {
            return (
              <img
                key={participant._id}
                src={participant.avatarUrl}
                loading="lazy"
                className={`w-9 h-9 border-2 border-white dark:border-backgroundDark2 rounded-full absolute ${
                  i === 0
                    ? "left-0 z-30"
                    : i === 1
                    ? "left-2 z-20"
                    : i === 2
                    ? "left-4 z-10"
                    : ""
                }`}
              />
            );
          })}
        </div>
      ) : (
        <img
          className="size-12 rounded-full object-cover flex-shrink-0"
          src={filteredChat.avatar}
          alt=""
          loading="lazy"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-base text-text_light_primary dark:text-text_dark_primary truncate">
            {filteredChat.title}
          </p>
          <span className="text-xs text-text_light_secondary dark:text-text_dark_secondary ml-2 flex-shrink-0">
            {chat.lastMessage
              ? moment(chat.lastMessage?.createdAt).format("HH:mm")
              : ""}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-text_light_secondary dark:text-text_dark_secondary truncate">
            {limitChar(filteredChat.lastMessage, 30)}
          </p>
        </div>
      </div>
    </div>
  );
}
