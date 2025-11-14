import React, { useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import mime from "mime-types";
import {
  BiSearch,
  BsThreeDotsVertical,
  FaFile,
  FiImage,
  ImEnlarge2,
  IoMdAttach,
  IoMdSend,
  IoVideocamOutline,
  MdArrowBackIos,
  MdDeleteOutline,
  PiDownloadSimpleBold,
  RxCross2,
} from "../assets";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import Loading from "./Loading";
import { getOpponentParticipant, limitChar } from "../utils";
import OutsideClickHandler from "react-outside-click-handler";
import { useConnectWebRtc } from "../context/WebRtcContext";
import ViewImage from "./ViewImage";

const MessageCont = ({ isOwnMessage, isGroupChat, message }) => {
  const { deleteChatMessage } = useChat();
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const { user } = useAuth();

  const handleEnlargeClick = (url) => {
    setCurrentImageUrl(url);
    setIsOpenView(true);
  };
  return (
    <div className={`w-auto flex my-2 `}>
      <div
        className={`flex  ${
          isOwnMessage ? "max-w-[50%] md:max-w-[85%] ml-auto " : "mr-auto"
        }`}
      >
        <div
          className={`flex flex-col justify-center relative ${
            isOwnMessage 
              ? "bg-whatsapp_green_light dark:bg-whatsapp_green_dark message-tail-right" 
              : "bg-whatsapp_bubble_light dark:bg-whatsapp_bubble_dark message-tail-left"
          } min-w-[120px] max-w-full px-2 py-1.5 md:p-2 rounded-lg ${
            isOwnMessage ? "rounded-br-sm" : "rounded-bl-sm"
          } mb-1 ${isOwnMessage ? "order-2" : "order-1"} shadow-sm`}
        >
          {message.attachments?.length ? (
            <div className="flex gap-1 flex-wrap">
              {message.attachments?.map((file) => (
                <div className="flex flex-col">
                  <div>
                    {(() => {
                      const fileExtension = file.url
                        .split("/")
                        .pop()
                        .toLowerCase()
                        .split(".")
                        .pop();
                      const isImage = [
                        "jpg",
                        "jpeg",
                        "png",
                        "webp",
                        "gif",
                        "svg",
                      ].includes(fileExtension);

                      if (isImage) {
                        return (
                          <img
                            src={file.url}
                            loading="lazy"
                            className={`${
                              message.attachments?.length > 1
                                ? "size-44"
                                : "size-72 md:size-60"
                            } object-cover rounded-md`}
                          />
                        );
                      } else {
                        return (
                          <div className="flex flex-col items-center justify-center">
                            <FaFile className="text-3xl text-gray-400 dark:text-gray-500" />
                            <p>
                              {limitChar(file.url.split("/").pop(), 10)}.
                              {fileExtension}
                            </p>
                          </div>
                        );
                      }
                    })()}

                    {isOpenView && (
                      <ViewImage
                        openView={isOpenView}
                        setOpenView={setIsOpenView}
                        imageUrl={currentImageUrl}
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 rounded-sm">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleEnlargeClick(file.url)}
                    >
                      <ImEnlarge2 className="dark:text-text_light_primary" />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        saveAs(file.url, file.url.split("/").slice(-1));
                      }}
                    >
                      <PiDownloadSimpleBold className="text-xl dark:text-text_light_primary" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          <p className={`px-2 py-1 text-sm md:text-sm ${
            isOwnMessage ? "text-text_light_primary dark:text-white" : "text-text_light_primary dark:text-text_dark_primary"
          }`}>
            {message.content}
          </p>

          <div className={`flex items-center gap-1 justify-end mt-1 ${
            isOwnMessage ? "text-text_light_secondary dark:text-gray-300" : "text-text_light_secondary dark:text-text_dark_secondary"
          }`}>
            <span className="text-[11px]">
              {moment(message.createdAt).format("HH:mm")}
            </span>
          </div>
        </div>
        <div
          className={`mx-3 md:mx-0 ${isOwnMessage ? "order-1" : "order-2"} `}
        >
          <div className="relative cursor-pointer text-md text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
            <OutsideClickHandler
              onOutsideClick={() => setShowMessageMenu(false)}
            >
              <BsThreeDotsVertical
                onClick={() => setShowMessageMenu(!showMessageMenu)}
              />
              {showMessageMenu ? (
                <div className="text-white bg-gray-800 dark:bg-gray-700 p-2 text-sm rounded-lg shadow-lg absolute top-0 -left-14">
                  <p
                    onClick={() => {
                      navigator.clipboard.writeText(message.content);
                      setShowMessageMenu(false);
                    }}
                    className="mb-1 hover:text-gray-300"
                  >
                    copy
                  </p>
                  <p
                    onClick={() => deleteChatMessage(message._id)}
                    className={`text-red-400 hover:text-red-500 ${
                      user._id !== message?.sender._id && "hidden"
                    }`}
                  >
                    Delete
                  </p>
                </div>
              ) : (
                ""
              )}
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatsSection() {
  const {
    messages,
    currentSelectedChat,
    loadingMessages,
    message,
    setMessage,
    sendChatMessage,
    attachments,
    setAttachments,
    removeFileFromAttachments,
    deleteUserChat,
    setIsChatSelected,
  } = useChat();
  const { user } = useAuth();

  const opponentParticipant = getOpponentParticipant(
    currentSelectedChat.current?.participants,
    user._id
  );

  const opponentUsername = opponentParticipant?.username;
  const opponentProfilePictureUrl = opponentParticipant?.avatarUrl;

  const scrollToBottomRef = new useRef();

  const scrollToBottom = () => {
    scrollToBottomRef.current?.scrollIntoView();
  };

  const { handleCall, setTargetUserId, targetUserId } = useConnectWebRtc();

  const handleCallButtonClick = async () => {
    if (opponentParticipant?._id) {
      setTargetUserId(opponentParticipant?._id);
    }
  };

  // handle call only if the target user id is available
  useEffect(() => {
    if (targetUserId) {
      handleCall();
    }
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="overflow-y-hidden">
      <div className="flex w-full items-center justify-between px-4 py-2.5 md:p-3 bg-backgroundLight1 dark:bg-backgroundDark2 border-b border-border_light dark:border-border_dark">
        <div className="flex gap-3 items-center ">
          <div onClick={() => setIsChatSelected(false)}>
            {" "}
            <MdArrowBackIos className="hidden md:block dark:text-white text-2xl" />{" "}
          </div>
          {currentSelectedChat.current.isGroupChat ? (
            <div className="w-10 relative h-10 flex-shrink-0 flex justify-start items-center flex-nowrap mr-3">
              {currentSelectedChat.current.participants
                .slice(0, 3)
                .map((participant, i) => {
                  return (
                    <img
                      key={participant._id}
                      src={participant.avatarUrl}
                      className={`w-10 h-10  border-white rounded-full absolute outline outline-3 outline-black ${
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
              className="size-10 rounded-full object-cover"
              src={opponentProfilePictureUrl}
              alt=""
              loading="lazy"
            />
          )}

          {/* <img
            className="size-12 rounded-full object-cover"
            src={opponentProfilePictureUrl}
            alt=""
          /> */}
          <h3 className="font-medium text-base md:text-sm text-text_light_primary dark:text-text_dark_primary">
            {currentSelectedChat.current?.isGroupChat
              ? currentSelectedChat.current.name
              : opponentUsername}
          </h3>
        </div>

        <div className="text-xl flex gap-4 md:gap-3 text-text_light_secondary dark:text-text_dark_secondary">
          <div className="cursor-pointer">
            <BiSearch />
          </div>
          {/* <div className="cursor-pointer">
            <IoCallOutline />
          </div>
        */}
          <div className="cursor-pointer">
            {!currentSelectedChat.current?.isGroupChat && (
              <IoVideocamOutline onClick={handleCallButtonClick} />
            )}
          </div>
          <div className="cursor-pointer text-red-500">
            {currentSelectedChat.current?.admin.toString() === user._id ? (
              <MdDeleteOutline
                onClick={() => deleteUserChat(currentSelectedChat.current?._id)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="chat-msg-cont relative overflow-auto px-4 md:px-2 w-full h-[calc(100vh-180px)] md:h-[calc(100vh-260px)] bg-[#E5DDD5] dark:bg-backgroundDark3" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"%23E5DDD5\"/%3E%3C/svg%3E')"}}>
        {loadingMessages ? (
          <div className=" h-full w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : !messages?.length ? (
          <div className="h-full w-full flex items-center justify-center bg-backgroundLight1 dark:bg-backgroundDark3">
            <h1 className="text-lg text-text_light_secondary dark:text-text_dark_secondary">
              No Messages Yet...
            </h1>
          </div>
        ) : (
          <>
            {messages?.map((msg) => (
              <MessageCont
                key={msg._id}
                isOwnMessage={msg.sender?._id === user?._id}
                isGroupChatMessage={currentSelectedChat.current?.isGroupChat}
                message={msg}
              />
            ))}
            <div ref={scrollToBottomRef} />
          </>
        )}
      </div>
      {!!attachments.length && (
        <div className="showAttachmentFiles absolute bottom-24  grid grid-cols-5 gap-2 ">
          {attachments?.map((file, index) => (
            <div
              key={index}
              className="px-2 bg-gray-900 bg-opacity-60 rounded-lg flex flex-col items-center backdrop-blur-sm"
            >
              <div className="text-red-500 w-full ">
                <RxCross2
                  className="float-right text-2xl cursor-pointer"
                  onClick={() => removeFileFromAttachments(index)}
                />
              </div>
              {file.type.startsWith("image/") ? (
                <img
                  className="w-full h-auto object-cover"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : (
                <div className="flex flex-col gap-2 my-5 items-center">
                  <FaFile className="text-3xl text-white" />
                  <p className="text-xs text-gray-400 dark:text-white">
                    {file.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="h-auto border-t border-border_light dark:border-border_dark bg-backgroundLight1 dark:bg-backgroundDark2 w-full flex items-center justify-between px-3 py-2 md:p-2">
        <div className="flex-1 mr-4 md:mr-2 ">
          <input
            type="text"
            placeholder="Enter Message..."
            className="w-full px-4 py-2.5 md:p-2 text-sm rounded-3xl bg-backgroundLight1 dark:bg-backgroundDark3 focus:outline-none dark:text-text_dark_primary text-text_light_primary"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendChatMessage();
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4 md:space-x-2">
          <div>
            <label htmlFor="imageAttach" className="cursor-pointer">
              <FiImage className="text-primary text-2xl md:text-md hover:text-primary_hover" />
            </label>
            <input
              type="file"
              accept="image/*"
              id="imageAttach"
              hidden
              value=""
              max={5}
              multiple
              onChange={(e) => setAttachments([...e.target.files])}
            />
          </div>
          {/* // future version  */}
          <div>
            <label htmlFor="fileAttach" className="cursor-pointer">
              <IoMdAttach className="text-primary text-xl hover:text-primary_hover" />
            </label>
            <input
              type="file"
              id="fileAttach"
              hidden
              value=""
              max={5}
              multiple
              onChange={(e) => setAttachments([...e.target.files])}
            />
          </div>

          <button
            disabled={!message && !attachments.length}
            onClick={sendChatMessage}
            className="bg-primary hover:bg-primary_hover transition-colors p-2.5 md:p-2 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed ml-2"
          >
            <IoMdSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
