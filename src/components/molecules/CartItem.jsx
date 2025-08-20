import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const CartItem = ({ item, onUpdateQuantity }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-soft p-4 space-y-3"
    >
      <div className="flex items-start space-x-3">
        {/* Product Image */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <ApperIcon name="Package" className="w-8 h-8 text-gray-400" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>
          <div className="text-sm text-gray-500 mt-1">
            {formatPrice(item.price)} / unité
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onUpdateQuantity(item.Id, 0)}
          className="p-1 text-gray-400 hover:text-error transition-colors rounded-lg hover:bg-gray-50"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </button>
      </div>

      {/* Quantity Controls & Total */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.Id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 p-0 rounded-lg"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </Button>
          
          <span className="font-semibold text-lg min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.Id, item.quantity + 1)}
            className="w-8 h-8 p-0 rounded-lg"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;