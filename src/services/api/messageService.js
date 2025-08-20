import mockMessages from "@/services/mockData/messages.json";
import mockConversations from "@/services/mockData/conversations.json";

let messages = [...mockMessages];
let conversations = [...mockConversations];

const delay = () => new Promise(resolve => setTimeout(resolve, 300));

export const getAll = async () => {
  await delay();
  return [...messages];
};

export const getById = async (id) => {
  await delay();
  const message = messages.find(m => m.Id === id || m.id === id);
  if (!message) {
    throw new Error("Message not found");
  }
  return { ...message };
};

export const getConversations = async (role) => {
  await delay();
  return [...conversations];
};

export const getMessages = async (conversationId) => {
  await delay();
  return messages.filter(m => m.conversationId === conversationId);
};

export const sendMessage = async (messageData) => {
  await delay();
  const maxId = messages.length > 0 ? Math.max(...messages.map(m => m.Id || m.id)) : 0;
  const newMessage = {
    Id: maxId + 1,
    id: maxId + 1,
    ...messageData,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  return { ...newMessage };
};

export const create = async (messageData) => {
  return await sendMessage(messageData);
};

export const update = async (id, messageData) => {
  await delay();
  const index = messages.findIndex(m => (m.Id === id || m.id === id));
  if (index === -1) {
    throw new Error("Message not found");
  }
  const updatedMessage = {
    ...messages[index],
    ...messageData,
    updatedAt: new Date().toISOString()
  };
  messages[index] = updatedMessage;
  return { ...updatedMessage };
};

export const delete_ = async (id) => {
  await delay();
  const index = messages.findIndex(m => (m.Id === id || m.id === id));
  if (index === -1) {
    throw new Error("Message not found");
  }
  const deletedMessage = messages[index];
  messages.splice(index, 1);
  return { ...deletedMessage };
};

export { delete_ as delete };