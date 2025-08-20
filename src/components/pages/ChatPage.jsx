import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ChatInterface from "@/components/organisms/ChatInterface";
import Empty from "@/components/ui/Empty";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import * as messageService from "@/services/api/messageService";

const ChatPage = ({ currentRole }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await messageService.getConversations(currentRole);
      setConversations(data);
      if (data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0]);
      }
    } catch (err) {
      console.error("Error loading conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const data = await messageService.getMessages(conversationId);
      setMessages(data);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  useEffect(() => {
    loadConversations();
  }, [currentRole]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.Id);
    }
  }, [selectedConversation]);

  const handleSendMessage = async (content) => {
    if (!selectedConversation) return;

    try {
      const newMessage = {
        orderId: selectedConversation.orderId,
        senderId: "current-user",
        senderName: getCurrentUserName(),
        content,
        timestamp: new Date().toISOString()
      };

      await messageService.sendMessage(newMessage);
      setMessages(prev => [...prev, newMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const getCurrentUserName = () => {
    switch (currentRole) {
      case "customer": return "Client";
      case "driver": return "Livreur";
      case "merchant": return "Commerçant";
      default: return "Utilisateur";
    }
  };

  const getRoleTitle = () => {
    switch (currentRole) {
      case "customer": return "Mes conversations";
      case "driver": return "Chat avec clients";
      case "merchant": return "Support client";
      default: return "Messages";
    }
  };

  const getConversationTitle = (conversation) => {
    switch (currentRole) {
      case "customer":
        return `Commande #${conversation.orderId?.toString().padStart(4, "0")} - ${conversation.driverName || "Livreur"}`;
      case "driver":
        return `${conversation.customerName || "Client"} - Commande #${conversation.orderId?.toString().padStart(4, "0")}`;
      case "merchant":
        return `${conversation.customerName || "Client"} - Commande #${conversation.orderId?.toString().padStart(4, "0")}`;
      default:
        return `Conversation #${conversation.Id}`;
    }
  };

  if (conversations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary via-primary-600 to-secondary px-6 py-8 safe-area-top">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white font-display mb-1">
                  {getRoleTitle()}
                </h1>
                <p className="text-white/90 text-sm">
                  Communiquez pendant les livraisons
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ApperIcon name="MessageCircle" className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-6 py-6">
          <Empty
            title="Aucune conversation"
            message="Vous n'avez pas encore de conversations actives. Les chats apparaîtront ici lors de vos commandes."
            icon="MessageCircle"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-600 to-secondary px-6 py-6 safe-area-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white font-display mb-1">
                {getRoleTitle()}
              </h1>
              <p className="text-white/90 text-sm">
                {conversations.length} conversation{conversations.length !== 1 ? "s" : ""} active{conversations.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="MessageCircle" className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Conversations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          {conversations.map((conversation) => (
            <motion.button
              key={conversation.Id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full bg-white rounded-xl shadow-soft p-4 transition-all duration-200 ${
                selectedConversation?.Id === conversation.Id
                  ? "ring-2 ring-primary shadow-medium"
                  : "hover:shadow-medium"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Avatar
                  size="md"
                  fallback={
                    currentRole === "customer" 
                      ? "L" 
                      : currentRole === "driver" 
                      ? "C" 
                      : "C"
                  }
                />
                
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-900 text-sm">
                    {getConversationTitle(conversation)}
                  </div>
                  <div className="text-gray-600 text-xs mt-1">
                    {conversation.lastMessage || "Pas de messages"}
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  {conversation.unreadCount > 0 && (
                    <Badge variant="primary" className="text-xs min-w-[20px] h-5">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                  <Badge variant="success" className="text-xs">
                    En ligne
                  </Badge>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Chat Interface */}
        {selectedConversation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-soft overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Avatar
                    size="sm"
                    fallback={
                      currentRole === "customer" 
                        ? "L" 
                        : currentRole === "driver" 
                        ? "C" 
                        : "C"
                    }
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {getConversationTitle(selectedConversation)}
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">En ligne</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUserId="current-user"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;