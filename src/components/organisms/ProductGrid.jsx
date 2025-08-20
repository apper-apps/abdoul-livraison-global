import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = ({ products, loading, error, onRetry, onAddToCart, showMerchant = true }) => {
  if (loading) {
    return <Loading type="skeleton" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!products || products.length === 0) {
    return (
      <Empty
        title="Aucun produit trouvé"
        message="Il n'y a pas de produits disponibles pour le moment."
        icon="Package"
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
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            showMerchant={showMerchant}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;