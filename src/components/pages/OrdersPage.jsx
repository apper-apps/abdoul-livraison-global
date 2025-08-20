import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import OrdersList from "@/components/organisms/OrdersList";
import Badge from "@/components/atoms/Badge";
import * as orderService from "@/services/api/orderService";

const OrdersPage = ({ currentRole }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError("Impossible de charger les commandes");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getRoleTitle = () => {
    switch (currentRole) {
      case "customer":
        return "Mes commandes";
      case "driver":
        return "Commandes disponibles";
      case "merchant":
        return "Commandes reçues";
      default:
        return "Commandes";
    }
  };

  const getStatusOptions = () => {
    return [
      { value: "all", label: "Toutes", count: orders.length },
      { value: "placed", label: "Commandées", count: orders.filter(o => o.status === "placed").length },
      { value: "accepted", label: "Acceptées", count: orders.filter(o => o.status === "accepted").length },
      { value: "in-transit", label: "En livraison", count: orders.filter(o => o.status === "in-transit").length },
      { value: "delivered", label: "Livrées", count: orders.filter(o => o.status === "delivered").length }
    ];
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const statusOptions = getStatusOptions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
                {getRoleTitle()}
              </h1>
              <p className="text-white/90 text-sm">
                Suivez l'état de vos commandes en temps réel
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="ShoppingBag" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {orders.filter(o => o.status === "placed").length}
              </div>
              <div className="text-xs text-white/80">
                Nouvelles
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {orders.filter(o => o.status === "accepted").length}
              </div>
              <div className="text-xs text-white/80">
                Acceptées
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {orders.filter(o => o.status === "in-transit").length}
              </div>
              <div className="text-xs text-white/80">
                En route
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {orders.filter(o => o.status === "delivered").length}
              </div>
              <div className="text-xs text-white/80">
                Livrées
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Status Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex overflow-x-auto space-x-3 pb-2 px-1 scrollbar-hide">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStatusFilter(option.value)}
                className="flex-shrink-0"
              >
                <Badge
                  variant={statusFilter === option.value ? "primary" : "default"}
                  className="px-4 py-2 cursor-pointer transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                >
                  <span>{option.label}</span>
                  {option.count > 0 && (
                    <span className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${
                      statusFilter === option.value 
                        ? "bg-white/20 text-white" 
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {option.count}
                    </span>
                  )}
                </Badge>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <OrdersList
            orders={filteredOrders}
            loading={loading}
            error={error}
            currentRole={currentRole}
            onRetry={loadOrders}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;