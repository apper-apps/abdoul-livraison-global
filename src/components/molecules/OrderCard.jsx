import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const OrderCard = ({ order, currentRole, onViewDetails }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "placed": return "Clock";
      case "accepted": return "CheckCircle";
      case "in-transit": return "Truck";
      case "delivered": return "Package";
      case "cancelled": return "X";
      default: return "Clock";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "placed": return "Commandé";
      case "accepted": return "Accepté";
      case "in-transit": return "En livraison";
      case "delivered": return "Livré";
      case "cancelled": return "Annulé";
      default: return status;
    }
  };

  const getRoleSpecificInfo = () => {
    switch (currentRole) {
      case "customer":
        return (
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Store" className="w-4 h-4 mr-1" />
            {order.merchantName}
          </div>
        );
      case "driver":
        return (
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="User" className="w-4 h-4 mr-1" />
            {order.customerName}
          </div>
        );
      case "merchant":
        return (
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="User" className="w-4 h-4 mr-1" />
            {order.customerName}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 p-4 space-y-4"
    >
      {/* Order Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900">
              Commande #{order.Id.toString().padStart(4, "0")}
            </h3>
            <Badge variant={order.status} className="text-xs">
              <ApperIcon name={getStatusIcon(order.status)} className="w-3 h-3 mr-1" />
              {getStatusText(order.status)}
            </Badge>
          </div>
          
          {getRoleSpecificInfo()}
          
          <div className="text-xs text-gray-500 mt-1">
            {format(new Date(order.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
            {formatPrice(order.totalAmount)}
          </div>
          <div className="text-xs text-gray-500">
            {order.products?.length || 0} article{(order.products?.length || 0) > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Products Preview */}
      {order.products && order.products.length > 0 && (
        <div className="border-t pt-3">
          <div className="space-y-2">
            {order.products.slice(0, 2).map((product, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <ApperIcon name="Package" className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-900">{product.name}</span>
                    <span className="text-gray-500 ml-2">×{product.quantity}</span>
                  </div>
                </div>
                <span className="font-medium text-gray-700">
                  {formatPrice(product.price * product.quantity)}
                </span>
              </div>
            ))}
            
            {order.products.length > 2 && (
              <div className="text-xs text-gray-500 text-center pt-2">
                +{order.products.length - 2} autre{order.products.length - 2 > 1 ? "s" : ""} article{order.products.length - 2 > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Address */}
      {order.deliveryAddress && (
        <div className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          <ApperIcon name="MapPin" className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{order.deliveryAddress}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(order.Id)}
          className="flex-1"
        >
          <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
          Voir détails
        </Button>
        
        {currentRole === "driver" && order.status === "placed" && (
          <Button
            size="sm"
            className="flex-1"
          >
            <ApperIcon name="Check" className="w-4 h-4 mr-2" />
            Accepter
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default OrderCard;