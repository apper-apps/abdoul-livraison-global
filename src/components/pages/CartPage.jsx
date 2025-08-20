import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";

const CartPage = ({ cart, updateQuantity, total }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const deliveryFee = 1000; // Fixed delivery fee
  const totalWithDelivery = total + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
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
                  Mon Panier
                </h1>
                <p className="text-white/90 text-sm">
                  Votre panier est vide
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ApperIcon name="ShoppingCart" className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="px-6 py-6">
          <Empty
            title="Votre panier est vide"
            message="Explorez nos produits et ajoutez vos articles préférés à votre panier."
            icon="ShoppingCart"
            action={() => navigate("/")}
            actionLabel="Voir les produits"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-600 to-secondary px-6 py-8 safe-area-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white font-display mb-1">
                Mon Panier
              </h1>
              <p className="text-white/90 text-sm">
                {cart.length} article{cart.length > 1 ? "s" : ""} dans votre panier
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="ShoppingCart" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Total Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatPrice(totalWithDelivery)}
              </div>
              <div className="text-white/80 text-sm">
                Total avec livraison
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Cart Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {cart.map((item, index) => (
            <motion.div
              key={item.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <CartItem
                item={item}
                onUpdateQuantity={updateQuantity}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Receipt" className="w-5 h-5 mr-2 text-primary" />
            Résumé de la commande
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total ({cart.length} article{cart.length > 1 ? "s" : ""})</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  {formatPrice(totalWithDelivery)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate("/checkout")}
            size="lg"
            className="w-full"
          >
            <ApperIcon name="CreditCard" className="w-5 h-5 mr-2" />
            Passer la commande
          </Button>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Continuer mes achats
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;