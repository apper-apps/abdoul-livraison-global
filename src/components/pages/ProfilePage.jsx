import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Input from "@/components/atoms/Input";

const ProfilePage = ({ currentRole }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Abdoul Karim",
    phone: "+226 70 12 34 56",
    email: "abdoul@example.com",
    address: "Secteur 15, Ouagadougou, Burkina Faso"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditing(false);
    // Here you would typically save to your service
  };

  const getRoleInfo = () => {
    switch (currentRole) {
      case "customer":
        return {
          title: "Profil Client",
          subtitle: "Gérez vos informations personnelles",
          icon: "User",
          stats: [
            { label: "Commandes", value: "47", icon: "ShoppingBag" },
            { label: "Favoris", value: "23", icon: "Heart" },
            { label: "Points", value: "1,234", icon: "Star" }
          ]
        };
      case "driver":
        return {
          title: "Profil Livreur",
          subtitle: "Gérez votre activité de livraison",
          icon: "Truck",
          stats: [
            { label: "Livraisons", value: "156", icon: "Package" },
            { label: "Rating", value: "4.8", icon: "Star" },
            { label: "Revenus", value: "234K", icon: "DollarSign" }
          ]
        };
      case "merchant":
        return {
          title: "Profil Commerçant",
          subtitle: "Gérez votre boutique en ligne",
          icon: "Store",
          stats: [
            { label: "Produits", value: "89", icon: "Package" },
            { label: "Commandes", value: "234", icon: "ShoppingBag" },
            { label: "Revenus", value: "567K", icon: "DollarSign" }
          ]
        };
      default:
        return {
          title: "Profil",
          subtitle: "Gérez vos informations",
          icon: "User",
          stats: []
        };
    }
  };

  const roleInfo = getRoleInfo();

  const menuItems = [
    { icon: "Bell", label: "Notifications", badge: "3" },
    { icon: "CreditCard", label: "Modes de paiement" },
    { icon: "MapPin", label: "Adresses de livraison" },
    { icon: "Heart", label: "Favoris" },
    { icon: "History", label: "Historique" },
    { icon: "Settings", label: "Paramètres" },
    { icon: "HelpCircle", label: "Aide & Support" },
    { icon: "Shield", label: "Confidentialité" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
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
                {roleInfo.title}
              </h1>
              <p className="text-white/90 text-sm">
                {roleInfo.subtitle}
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name={roleInfo.icon} className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-center space-x-4">
              <Avatar
                size="lg"
                fallback={formData.name.charAt(0)}
                className="border-2 border-white/30"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-white">
                  {formData.name}
                </h2>
                <p className="text-white/80 text-sm">{formData.phone}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="success" className="text-xs">
                    <ApperIcon name="Check" className="w-3 h-3 mr-1" />
                    Vérifié
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Niveau Gold
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          {roleInfo.stats.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {roleInfo.stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
                  <ApperIcon name={stat.icon} className="w-6 h-6 text-white mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-soft p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary" />
              Informations personnelles
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => editing ? handleSave() : setEditing(true)}
            >
              <ApperIcon name={editing ? "Save" : "Edit"} className="w-4 h-4 mr-2" />
              {editing ? "Enregistrer" : "Modifier"}
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Nom complet"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!editing}
            />
            
            <Input
              label="Numéro de téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!editing}
            />
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editing}
            />
            
            <Input
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!editing}
            />
          </div>
        </motion.div>

        {/* Menu Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-soft overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                  <ApperIcon name={item.icon} className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {item.badge && (
                  <Badge variant="primary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
                <ApperIcon name="ChevronRight" className="w-4 h-4 text-gray-400" />
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Role-specific Actions */}
        {currentRole === "driver" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-soft p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="Settings" className="w-5 h-5 mr-2 text-primary" />
              Paramètres livreur
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Power" className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Disponibilité</div>
                    <div className="text-sm text-gray-600">Recevoir de nouvelles commandes</div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm ml-auto"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Bell" className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">Notifications sonores</div>
                    <div className="text-sm text-gray-600">Son pour nouvelles commandes</div>
                  </div>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center p-1">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            size="lg"
          >
            <ApperIcon name="LogOut" className="w-5 h-5 mr-2" />
            Se déconnecter
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;