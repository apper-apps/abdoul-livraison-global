import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const RoleSelector = ({ currentRole, onRoleChange }) => {
  const roles = [
    { 
      id: "customer", 
      label: "Client", 
      icon: "User",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    { 
      id: "driver", 
      label: "Livreur", 
      icon: "Truck",
      color: "from-secondary to-secondary-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
    { 
      id: "merchant", 
      label: "Commerçant", 
      icon: "Store",
      color: "from-accent to-accent-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-xl shadow-strong p-2 border border-gray-100">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 px-2">
            Mode:
          </span>
          
          {roles.map((role) => (
            <motion.button
              key={role.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRoleChange(role.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                currentRole === role.id
                  ? `${role.bgColor} ${role.textColor} shadow-soft`
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <ApperIcon name={role.icon} className="w-4 h-4" />
              <span className="text-sm font-medium">
                {role.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;