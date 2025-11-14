import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { BiSearch, RiUserSearchLine, RxCross2, profile2 } from "../assets";
import {
  createOneToOneChat,
  getAllcurrentUserChats,
  getAvailableUsers,
  createGroupChat,
} from "../api";
import { useChat } from "../context/ChatContext";
import { requestHandler } from "../utils";

export function AddChat({ open }) {
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupChatParticipants, setGroupChatParticipants] = useState([]);
  const [users, setUsers] = useState([]);
  const [creatingChat, setCreatingChat] = useState(false);

  // context
  const {
    openAddChat,
    setOpenAddChat,
    newChatUser,
    setNewChatUser,
    loadingChats,
    setLoadingChats,
    currentUserChats,
    setCurrentUserChats,
    getCurrentUserChats,
    setActiveLeftSidebar,
  } = useChat();

  // ref's
  const searchUserRef = useRef();

  const handleClose = () => {
    setUsers([]);
    setNewChatUser(null);
    setGroupName("");
    setGroupChatParticipants([]);
    setOpenAddChat(false);
  };

  // search users for the adding into group
  const handleSearchUser = async () => {
    const { data } = await getAvailableUsers(searchUserRef.current.value);
    setUsers(data.data?.users || []);
  };

  // create a new chat with a new user
  const createNewOneToOneChat = async () => {
    if (!newChatUser) return alert("please select an user"); // if user not selected to create chat with

    // handle the request to create a new chat
    await requestHandler(
      () => createOneToOneChat(newChatUser?._id), // pass the userId to chat with
      setCreatingChat,
      (res) => {
        const { data } = res;
        // alert a message if chat already exists by seeing the flag field "existing"
        if (data?.existing) {
          return alert("chat already exists with the selected user");
        }

        // if chat is created fetch all the updated current user chats
        getCurrentUserChats();
        setActiveLeftSidebar("recentChats");
        handleClose();
      },
      alert
    );
  };

  // create group chat
  const createNewGroupChat = async () => {
    // check if group name exists or not
    if (!groupName.trim()) {
      return alert("no group name provided");
    }

    // check for group chat participants
    if (!groupChatParticipants.length || groupChatParticipants.length < 2) {
      return alert("There must be atleast 2 members in the group");
    }

    await requestHandler(
      async () => createGroupChat(groupName, groupChatParticipants),
      setCreatingChat,
      (res) => {
        const { data } = res;
        getCurrentUserChats();
        setActiveLeftSidebar("recentChats");
        handleClose();
      }
    );
  };
  return (
    <Transition show={openAddChat} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 bg-opacity-75 transition-opacity" />
        </Transition>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-full relative transform overflow-hidden rounded-lg bg-white dark:bg-backgroundDark2 px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-lg leading-6 font-medium text-text_light_primary dark:text-text_dark_primary"
                    >
                      New Chat
                    </DialogTitle>
                    <div className="mt-2 flex items-center gap-2">
                      <Switch
                        checked={isGroupChat}
                        onChange={setIsGroupChat}
                        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition data-[checked]:bg-primary"
                      >
                        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                      </Switch>
                      <span className="dark:text-text_dark_secondary text-text_light_secondary text-sm">
                        Enable group chat
                      </span>
                    </div>

                    {!isGroupChat && (
                      <div className="mt-3">
                        <p className="text-base font-normal dark:text-text_dark_primary text-text_light_primary">
                          Sure you want to create a chat with{" "}
                          {newChatUser?.username} ?
                        </p>
                      </div>
                    )}

                    {isGroupChat && (
                      <div className="w-full">
                        <div className="inputs mt-5">
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 rounded-md outline-none bg-backgroundLight2 dark:bg-backgroundDark1 text-text_light_primary dark:text-text_dark_primary border border-border_light dark:border-border_dark focus:border-primary transition-all text-sm"
                            placeholder="Enter group name"
                            onChange={(e) => setGroupName(e.target.value)}
                          />

                          <div className="addParticpants mt-2">
                            <div className="w-full flex justify-between items-center rounded-lg outline-none bg-gray-100 dark:bg-backgroundDark1 border border-gray-300 dark:border-gray-600">
                              <input
                                type="text"
                                className="w-[90%] px-4 py-3 rounded-lg outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                placeholder="Add more users..."
                                ref={searchUserRef}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSearchUser();
                                  }
                                }}
                              />
                              <span className="text-gray-500 dark:text-gray-400 px-3 cursor-pointer hover:text-primary transition-colors">
                                <BiSearch
                                  className="size-5"
                                  onClick={() => handleSearchUser()}
                                />
                              </span>
                            </div>
                            <div className="inputAccordianDiv">
                              <ul className="bg-gray-50 dark:bg-backgroundDark1 rounded-lg px-2 mt-2 max-h-[150px] overflow-auto border border-gray-200 dark:border-gray-600">
                                {users.map((user) => (
                                  <li
                                    key={user._id}
                                    className="text-gray-900 dark:text-white flex justify-between items-center my-2 p-2 hover:bg-gray-100 dark:hover:bg-backgroundDark2 rounded-lg transition-colors"
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        className="w-10 h-10 rounded-full object-cover"
                                        src={user.avatarUrl}
                                        alt={user.username}
                                      />
                                      <span>{user.username}</span>
                                    </div>
                                    {!groupChatParticipants.some(
                                      ({ _id }) => user._id === _id
                                    ) ? (
                                      <button
                                        className="px-3 py-1.5 text-xs text-white bg-primary rounded-lg hover:bg-primary_hover font-medium transition-colors"
                                        onClick={() => {
                                          if (
                                            isGroupChat &&
                                            !groupChatParticipants?.some(
                                              (participant) =>
                                                participant._id === user._id
                                            )
                                          ) {
                                            setGroupChatParticipants([
                                              ...groupChatParticipants,
                                              user,
                                            ]);
                                          }
                                        }}
                                      >
                                        Add
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="addedParticipants flex flex-wrap justify-center gap-1  mt-2">
                              {!!groupChatParticipants.length &&
                                groupChatParticipants.map((user) => (
                                  <div
                                    key={user._id}
                                    className="flex gap-1 bg-gray-200 dark:bg-backgroundDark1 px-3 py-1.5 rounded-full items-center border border-gray-300 dark:border-gray-600"
                                  >
                                    <div className="flex items-center gap-1">
                                      <img
                                        className="size-5 rounded-full object-cover"
                                        src={profile2}
                                        alt={user.username}
                                      />
                                      <span className="text-xs text-gray-900 dark:text-gray-300 font-medium">
                                        {user.username}
                                      </span>
                                    </div>
                                    <button
                                      className="ml-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                                      onClick={() => {
                                        setGroupChatParticipants(
                                          groupChatParticipants.filter(
                                            ({ _id }) => user._id !== _id
                                          )
                                        );
                                      }}
                                    >
                                      <RxCross2 />
                                    </button>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-backgroundLight2 dark:bg-backgroundDark1 px-4 py-2 text-sm font-medium mx-2 text-text_light_primary dark:text-text_dark_primary hover:bg-backgroundLight3 dark:hover:bg-backgroundDark3 transition-colors"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium mx-2 text-white hover:bg-primary_hover transition-colors"
                    onClick={
                      isGroupChat ? createNewGroupChat : createNewOneToOneChat
                    }
                  >
                    Create
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
