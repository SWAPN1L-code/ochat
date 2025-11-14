import axios from "axios";
import { LocalStorage } from "../utils";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = LocalStorage.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

// AUTH
export const loginUser = (data) => {
  return apiClient.post("/auth/login", data);
};

export const registerUser = (data) => {
  return apiClient.post("/auth/register", data);
};

export const logoutUser = () => {
  return apiClient.post("/auth/logout");
};

export const updateProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  return apiClient.patch("/auth/profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// USERS (search users)
export const getAvailableUsers = (usernameOrEmail) => {
  return apiClient.get(`/api/chat/users?userId=${usernameOrEmail}`);
};

// CHATS
export const createOneToOneChat = (receiverId) => {
  return apiClient.post(`/api/chat/c/${receiverId}`);
};

export const getAllcurrentUserChats = () => {
  return apiClient.get("/api/chat");
};

// MESSAGES
export const getChatMessages = (chatId) => {
  return apiClient.get(`/api/messages/${chatId}`);
};

export const sendMessage = (chatId, content, attachments) => {
  const formData = new FormData();
  if (content) formData.append("content", content);
  if (attachments) {
    attachments.forEach((file) => formData.append("attachments", file));
  }
  return apiClient.post(`/api/messages/${chatId}`, formData);
};

// GROUP
export const createGroupChat = (name, participants) => {
  return apiClient.post("/api/chat/group", { name, participants });
};

// DELETE
export const deleteMessage = (messageId) => {
  return apiClient.delete(`/api/messages/${messageId}`);
};

export const deleteChat = (chatId) => {
  return apiClient.delete(`/api/chat/${chatId}`);
};

export default apiClient;
