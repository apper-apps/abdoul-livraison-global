import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import * as productService from "@/services/api/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
    inStock: true
  });

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

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      imageUrl: "",
      inStock: true
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.price || !formData.category.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        merchantId: "merchant-001",
        merchantName: "Ma Boutique"
      };

      if (editingProduct) {
        const updatedProduct = await productService.update(editingProduct.Id, productData);
        setProducts(prev => prev.map(p => p.Id === editingProduct.Id ? updatedProduct : p));
        toast.success("Produit modifié avec succès !");
      } else {
        const newProduct = await productService.create(productData);
        setProducts(prev => [...prev, newProduct]);
        toast.success("Produit ajouté avec succès !");
      }

      resetForm();
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement du produit");
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl || "",
      inStock: product.inStock
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      await productService.delete(productId);
      setProducts(prev => prev.filter(p => p.Id !== productId));
      toast.success("Produit supprimé avec succès !");
    } catch (err) {
      toast.error("Erreur lors de la suppression du produit");
      console.error("Error deleting product:", err);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const categories = ["Alimentation", "Boissons", "Électronique", "Vêtements", "Cosmétiques", "Maison", "Sport", "Autres"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
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
                Mes Produits
              </h1>
              <p className="text-white/90 text-sm">
                Gérez votre catalogue de produits
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="Package" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {products.length}
              </div>
              <div className="text-xs text-white/80">
                Total
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {products.filter(p => p.inStock).length}
              </div>
              <div className="text-xs text-white/80">
                En stock
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {products.filter(p => !p.inStock).length}
              </div>
              <div className="text-xs text-white/80">
                Rupture
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-lg font-bold text-white">
                {[...new Set(products.map(p => p.category))].length}
              </div>
              <div className="text-xs text-white/80">
                Catégories
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Add Product Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Button
            onClick={() => setShowAddForm(true)}
            size="lg"
            className="w-full"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Ajouter un produit
          </Button>
        </motion.div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="p-2"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nom du produit *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: iPhone 14 Pro"
                  required
                />
                
                <Input
                  label="Prix (FCFA) *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Ex: 50000"
                  required
                  min="0"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="URL de l'image"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </div>

              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du produit..."
              />

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                  Produit en stock
                </label>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1">
                  <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                  {editingProduct ? "Modifier" : "Ajouter"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Products List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {loading ? (
            <Loading type="skeleton" />
          ) : error ? (
            <Error message={error} onRetry={loadProducts} />
          ) : products.length === 0 ? (
            <Empty
              title="Aucun produit"
              message="Vous n'avez pas encore ajouté de produits à votre catalogue."
              icon="Package"
              action={() => setShowAddForm(true)}
              actionLabel="Ajouter un produit"
            />
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-soft p-4"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ApperIcon name="Package" className="w-8 h-8 text-gray-400" />
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
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

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                            {formatPrice(product.price)}
                          </div>
                          <Badge variant="default" className="text-xs mt-1">
                            {product.category}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <ApperIcon name="Edit" className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.Id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <ApperIcon name="Trash2" className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;