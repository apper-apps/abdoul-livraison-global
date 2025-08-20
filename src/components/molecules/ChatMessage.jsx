import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Avatar from "@/components/atoms/Avatar";

const ChatMessage = ({ message, isOwn = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex items-end space-x-2 max-w-[80%] ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
        {!isOwn && (
          <Avatar
            size="sm"
            fallback={message.senderName?.charAt(0) || "U"}
            className="flex-shrink-0"
          />
        )}
        
        <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
          {!isOwn && (
            <span className="text-xs font-medium text-gray-600 mb-1 px-1">
              {message.senderName || "Utilisateur"}
            </span>
          )}
          
          <div
            className={`relative px-4 py-2 rounded-2xl shadow-soft ${
              isOwn
                ? "bg-gradient-to-r from-primary to-primary-600 text-white rounded-br-md"
                : "bg-white text-gray-900 rounded-bl-md border border-gray-100"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
            
            <div
              className={`text-xs mt-1 opacity-70 ${
                isOwn ? "text-white" : "text-gray-500"
              }`}
            >
              {format(new Date(message.timestamp), "HH:mm", { locale: fr })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;