import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ProductCard = ({ product, onAddToCart, showMerchant = true }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="Package" className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <Badge variant="success" className="text-xs">
              <ApperIcon name="Check" className="w-3 h-3 mr-1" />
              En stock
            </Badge>
          ) : (
            <Badge variant="error" className="text-xs">
              <ApperIcon name="X" className="w-3 h-3 mr-1" />
              Rupture
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
            {product.name}
          </h3>
          
          {showMerchant && product.merchantName && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <ApperIcon name="Store" className="w-4 h-4 mr-1" />
              {product.merchantName}
            </div>
          )}
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Category */}
        <Badge variant="default" className="text-xs">
          {product.category}
        </Badge>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </div>
          
          <Button
            size="sm"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="min-w-[100px]"
          >
            <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;