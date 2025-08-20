import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OrderCard from "@/components/molecules/OrderCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const OrdersList = ({ orders, loading, error, currentRole, onRetry }) => {
  const navigate = useNavigate();

  const handleViewDetails = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) {
    return <Loading type="skeleton" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!orders || orders.length === 0) {
    const getEmptyMessage = () => {
      switch (currentRole) {
        case "customer":
          return "Vous n'avez pas encore passé de commande.";
        case "driver":
          return "Aucune commande disponible pour le moment.";
        case "merchant":
          return "Vous n'avez reçu aucune commande pour le moment.";
        default:
          return "Aucune commande trouvée.";
      }
    };

    return (
      <Empty
        title="Aucune commande"
        message={getEmptyMessage()}
        icon="ShoppingBag"
        action={onRetry}
        actionLabel="Actualiser"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {orders.map((order, index) => (
        <motion.div
          key={order.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <OrderCard
            order={order}
            currentRole={currentRole}
            onViewDetails={handleViewDetails}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OrdersList;