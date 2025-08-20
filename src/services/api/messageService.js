import mockMessages from "@/services/mockData/messages.json";
import mockConversations from "@/services/mockData/conversations.json";

let messages = [...mockMessages];
let conversations = [...mockConversations];

const delay = () => new Promise(resolve => setTimeout(resolve, 200));

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
  const maxId = messages.length > 0 ? Math.max(...messages.map(m => m.Id)) : 0;
  const newMessage = {
    Id: maxId + 1,
    ...messageData,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);
  return { ...newMessage };
};