import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const MobileLayout = ({ currentRole, cartCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavigationItems = () => {
    const baseItems = [
      { id: "home", label: "Accueil", icon: "Home", path: "/" },
      { id: "orders", label: "Commandes", icon: "ShoppingBag", path: "/orders" },
      { id: "chat", label: "Messages", icon: "MessageCircle", path: "/chat" },
      { id: "profile", label: "Profil", icon: "User", path: "/profile" }
    ];

    if (currentRole === "merchant") {
      baseItems.splice(2, 0, { id: "products", label: "Produits", icon: "Package", path: "/products" });
    }

    if (currentRole === "customer" && cartCount > 0) {
      baseItems.splice(2, 0, { id: "cart", label: "Panier", icon: "ShoppingCart", path: "/cart", badge: cartCount });
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();
  const activeItem = navigationItems.find(item => item.path === location.pathname) || navigationItems[0];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 safe-area-bottom">
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-40">
        <nav className="flex items-center justify-around h-16 px-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                <div className="relative">
                  <ApperIcon
                    name={item.icon}
                    className={`w-6 h-6 transition-all duration-200 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  />
                  
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="primary" className="text-xs min-w-[20px] h-5 flex items-center justify-center px-1">
                        {item.badge > 99 ? "99+" : item.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <span
                  className={`text-xs font-medium mt-1 transition-all duration-200 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileLayout;