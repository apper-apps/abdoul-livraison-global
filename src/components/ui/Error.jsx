import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Une erreur s'est produite", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Oops ! Quelque chose s'est mal passé
        </h3>
        <p className="text-gray-600 max-w-sm">
          {message}
        </p>
      </div>
      
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Réessayer
        </Button>
      )}
    </motion.div>
  );
};

export default Error;