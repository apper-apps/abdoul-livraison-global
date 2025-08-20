import { motion } from "framer-motion";

const Loading = ({ text = "Chargement...", type = "default" }) => {
  if (type === "skeleton") {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-soft p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-200 rounded-full"
        >
          <div className="w-full h-full border-4 border-transparent border-t-primary rounded-full"></div>
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-sm"
        ></motion.div>
      </div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-gray-600 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default Loading;