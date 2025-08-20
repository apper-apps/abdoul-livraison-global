import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import MobileLayout from "@/components/organisms/MobileLayout";
import HomePage from "@/components/pages/HomePage";
import OrdersPage from "@/components/pages/OrdersPage";
import ChatPage from "@/components/pages/ChatPage";
import ProfilePage from "@/components/pages/ProfilePage";
import ProductsPage from "@/components/pages/ProductsPage";
import CartPage from "@/components/pages/CartPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import OrderDetailsPage from "@/components/pages/OrderDetailsPage";
import LoginPage from "@/components/pages/LoginPage";
import RoleSelector from "@/components/organisms/RoleSelector";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("customer");
  const [cart, setCart] = useState([]);

const handleLogin = (email, role = 'customer') => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    setCurrentRole("customer");
    setCart([]);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.Id === product.Id);
      if (existingItem) {
        return prevCart.map(item =>
          item.Id === product.Id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.Id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.Id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen">
          <LoginPage onLogin={handleLogin} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    );
  }
  return (
    <Router>
<div className="min-h-screen bg-gray-50 relative">
        <RoleSelector 
          currentRole={currentRole} 
          onRoleChange={setCurrentRole} 
          userEmail={userEmail}
          onLogout={handleLogout}
        />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MobileLayout currentRole={currentRole} cartCount={cart.length} />}>
              <Route index element={<HomePage currentRole={currentRole} addToCart={addToCart} />} />
              <Route path="orders" element={<OrdersPage currentRole={currentRole} />} />
              <Route path="orders/:orderId" element={<OrderDetailsPage currentRole={currentRole} />} />
              <Route path="chat" element={<ChatPage currentRole={currentRole} />} />
              <Route path="profile" element={<ProfilePage currentRole={currentRole} userEmail={userEmail} />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="cart" element={<CartPage cart={cart} updateQuantity={updateCartQuantity} total={cartTotal} />} />
              <Route path="checkout" element={<CheckoutPage cart={cart} total={cartTotal} clearCart={clearCart} />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;