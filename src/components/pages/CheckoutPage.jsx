import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import * as orderService from "@/services/api/orderService";

const CheckoutPage = ({ cart, total, clearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: "",
    paymentMethod: "mobile_money",
    phoneNumber: "",
    notes: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
  };

  const deliveryFee = 1000;
  const totalWithDelivery = total + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.deliveryAddress.trim()) {
      toast.error("Veuillez saisir votre adresse de livraison");
      return;
    }

    if (formData.paymentMethod !== "cash" && !formData.phoneNumber.trim()) {
      toast.error("Veuillez saisir votre numéro de téléphone");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        customerId: "customer-001",
        customerName: "Client",
        merchantId: "merchant-001", 
        merchantName: "Boutique Locale",
        products: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalWithDelivery,
        deliveryAddress: formData.deliveryAddress,
        paymentMethod: formData.paymentMethod,
        status: "placed",
        createdAt: new Date().toISOString()
      };

      const newOrder = await orderService.create(orderData);
      
      toast.success("Commande passée avec succès !");
      clearCart();
      navigate(`/orders/${newOrder.Id}`);
      
    } catch (err) {
      toast.error("Erreur lors de la création de la commande");
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/cart")}
              className="text-white hover:bg-white/10 p-2"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-white font-display mb-1">
                Finaliser la commande
              </h1>
              <p className="text-white/90 text-sm">
                Dernière étape avant livraison
              </p>
            </div>
            
            <div className="w-8"></div>
          </div>

          {/* Order Total */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">
                {formatPrice(totalWithDelivery)}
              </div>
              <div className="text-white/80 text-sm">
                {cart.length} article{cart.length > 1 ? "s" : ""} · Livraison incluse
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Package" className="w-5 h-5 mr-2 text-primary" />
            Votre commande
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item, index) => (
              <div key={item.Id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <ApperIcon name="Package" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-600">
                      {formatPrice(item.price)} × {item.quantity}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Delivery Information Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="MapPin" className="w-5 h-5 mr-2 text-primary" />
            Informations de livraison
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Adresse de livraison *"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              placeholder="Ex: Secteur 15, Rue 15.234, Maison bleue"
              required
            />

            <Input
              label="Notes pour le livreur"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Instructions spéciales, point de repère..."
            />

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mode de paiement *
              </label>
              <div className="space-y-2">
                {[
                  { value: "mobile_money", label: "Mobile Money", icon: "Smartphone" },
                  { value: "card", label: "Carte bancaire", icon: "CreditCard" },
                  { value: "cash", label: "Espèces à la livraison", icon: "Banknote" }
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center space-x-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === method.value
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={formData.paymentMethod === method.value}
                      onChange={handleInputChange}
                      className="text-primary focus:ring-primary"
                    />
                    <ApperIcon name={method.icon} className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{method.label}</span>
                    {method.value === "cash" && (
                      <Badge variant="warning" className="ml-auto text-xs">
                        Populaire
                      </Badge>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {formData.paymentMethod !== "cash" && (
              <Input
                label="Numéro de téléphone *"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Ex: 70 12 34 56"
                required
              />
            )}
          </form>
        </motion.div>

        {/* Order Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Receipt" className="w-5 h-5 mr-2 text-primary" />
            Récapitulatif
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span>{formatPrice(total)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total à payer</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                  {formatPrice(totalWithDelivery)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <ApperIcon name="Loader" className="w-5 h-5 mr-2 animate-spin" />
                Création de la commande...
              </>
            ) : (
              <>
                <ApperIcon name="Check" className="w-5 h-5 mr-2" />
                Confirmer la commande
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;