import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import * as orderService from "@/services/api/orderService";

const OrderDetailsPage = ({ currentRole }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getById(parseInt(orderId));
      setOrder(data);
    } catch (err) {
      setError("Impossible de charger les détails de la commande");
      console.error("Error loading order details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadOrderDetails();
    }
  }, [orderId]);

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

  if (loading) {
    return <Loading text="Chargement des détails..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadOrderDetails} />;
  }

  if (!order) {
    return <Error message="Commande introuvable" onRetry={() => navigate("/orders")} />;
  }

  const statusSteps = [
    { key: "placed", label: "Commandé", icon: "ShoppingBag" },
    { key: "accepted", label: "Accepté", icon: "CheckCircle" },
    { key: "in-transit", label: "En livraison", icon: "Truck" },
    { key: "delivered", label: "Livré", icon: "Package" }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-600 to-secondary px-6 py-8 safe-area-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/orders")}
              className="text-white hover:bg-white/10 p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            
            <div className="text-center flex-1">
              <h1 className="text-xl font-bold text-white font-display">
                Commande #{order.Id.toString().padStart(4, "0")}
              </h1>
              <p className="text-white/90 text-sm">
                {format(new Date(order.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
              </p>
            </div>
            
            <div className="w-8"></div>
          </div>

          <div className="text-center">
            <Badge variant={order.status} className="mb-2">
              <ApperIcon name={getStatusIcon(order.status)} className="w-4 h-4 mr-2" />
              {getStatusText(order.status)}
            </Badge>
            <div className="text-2xl font-bold text-white">
              {formatPrice(order.totalAmount)}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="MapPin" className="w-5 h-5 mr-2 text-primary" />
            Suivi de commande
          </h2>

          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? isCurrent
                          ? "bg-gradient-to-r from-primary to-primary-600 text-white shadow-soft"
                          : "bg-gradient-to-r from-accent to-accent-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ApperIcon name={step.icon} className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div
                      className={`font-medium transition-colors ${
                        isCompleted ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>
                    {isCurrent && (
                      <div className="text-sm text-primary font-medium">
                        État actuel
                      </div>
                    )}
                  </div>
                  
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`w-px h-8 -mt-2 -mb-2 transition-colors ${
                        index < currentStepIndex ? "bg-accent" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Package" className="w-5 h-5 mr-2 text-primary" />
            Articles commandés
          </h2>

          <div className="space-y-4">
            {order.products && order.products.map((product, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <ApperIcon name="Package" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {formatPrice(product.price)} × {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatPrice(product.price * product.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="MapPin" className="w-5 h-5 mr-2 text-primary" />
            Informations de livraison
          </h2>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <ApperIcon name="Home" className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Adresse de livraison</div>
                <div className="text-gray-600">{order.deliveryAddress}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ApperIcon name="CreditCard" className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Mode de paiement</div>
                <div className="text-gray-600">
                  {order.paymentMethod === "mobile_money" && "Mobile Money"}
                  {order.paymentMethod === "card" && "Carte bancaire"}
                  {order.paymentMethod === "cash" && "Espèces à la livraison"}
                </div>
              </div>
            </div>

            {currentRole === "customer" && order.driverName && (
              <div className="flex items-start space-x-3">
                <ApperIcon name="User" className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Livreur</div>
                  <div className="text-gray-600">{order.driverName}</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-3"
        >
          {currentRole === "customer" && order.status === "in-transit" && (
            <Button className="w-full" size="lg">
              <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
              Contacter le livreur
            </Button>
          )}

          {currentRole === "driver" && order.status === "placed" && (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="lg">
                <ApperIcon name="X" className="w-5 h-5 mr-2" />
                Refuser
              </Button>
              <Button size="lg">
                <ApperIcon name="Check" className="w-5 h-5 mr-2" />
                Accepter
              </Button>
            </div>
          )}

          {order.status === "delivered" && (
            <Button variant="outline" className="w-full" size="lg">
              <ApperIcon name="Star" className="w-5 h-5 mr-2" />
              Noter la commande
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;