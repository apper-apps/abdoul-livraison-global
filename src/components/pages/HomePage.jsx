import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import ProductGrid from "@/components/organisms/ProductGrid";
import Badge from "@/components/atoms/Badge";
import * as productService from "@/services/api/productService";

const HomePage = ({ currentRole, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("Impossible de charger les produits");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} ajouté au panier !`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getRoleContent = () => {
    switch (currentRole) {
      case "customer":
        return {
          title: "Découvrez nos produits",
          subtitle: "Commandez vos produits préférés et faites-vous livrer rapidement",
          icon: "ShoppingBag"
        };
      case "driver":
        return {
          title: "Commandes disponibles",
          subtitle: "Acceptez des livraisons et gagnez de l'argent",
          icon: "Truck"
        };
      case "merchant":
        return {
          title: "Tableau de bord",
          subtitle: "Gérez vos produits et suivez vos commandes",
          icon: "Store"
        };
      default:
        return {
          title: "Abdoul Livraison",
          subtitle: "Service de livraison local",
          icon: "Home"
        };
    }
  };

  const roleContent = getRoleContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-600 to-secondary px-6 py-8 safe-area-top">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white font-display mb-1">
                {roleContent.title}
              </h1>
              <p className="text-white/90 text-sm">
                {roleContent.subtitle}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name={roleContent.icon} className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Stats Cards for Different Roles */}
          <div className="grid grid-cols-3 gap-3">
            {currentRole === "customer" && (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    {filteredProducts.length}
                  </div>
                  <div className="text-xs text-white/80">
                    Produits
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    {categories.length}
                  </div>
                  <div className="text-xs text-white/80">
                    Catégories
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    24/7
                  </div>
                  <div className="text-xs text-white/80">
                    Service
                  </div>
                </div>
              </>
            )}
            
            {currentRole === "driver" && (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    12
                  </div>
                  <div className="text-xs text-white/80">
                    Livraisons
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    45k
                  </div>
                  <div className="text-xs text-white/80">
                    FCFA gagnés
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    4.8
                  </div>
                  <div className="text-xs text-white/80">
                    Rating
                  </div>
                </div>
              </>
            )}
            
            {currentRole === "merchant" && (
              <>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    89
                  </div>
                  <div className="text-xs text-white/80">
                    Commandes
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    234k
                  </div>
                  <div className="text-xs text-white/80">
                    FCFA vendus
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white">
                    {products.length}
                  </div>
                  <div className="text-xs text-white/80">
                    Produits
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {currentRole === "customer" && (
          <>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <SearchBar
                onSearch={handleSearch}
                placeholder="Rechercher des produits..."
              />
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </motion.div>

            {/* Results Info */}
            {(searchTerm || selectedCategory !== "all") && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
              >
                <div className="text-sm text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""} trouvé{filteredProducts.length !== 1 ? "s" : ""}
                  {selectedCategory !== "all" && ` dans "${selectedCategory}"`}
                </div>
                
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="text-sm text-primary hover:text-primary-600 font-medium"
                  >
                    Réinitialiser
                  </button>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            onAddToCart={currentRole === "customer" ? handleAddToCart : undefined}
            showMerchant={true}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;