import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "Aucun élément trouvé", 
  message = "Il n'y a rien à afficher pour le moment.",
  icon = "Package",
  action,
  actionLabel = "Actualiser"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 font-display">
          {title}
        </h3>
        <p className="text-gray-600 max-w-sm">
          {message}
        </p>
      </div>
      
      {action && (
        <Button onClick={action} variant="outline" className="mt-6">
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;