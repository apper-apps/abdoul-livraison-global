import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
password: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState('customer');
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [loginData, setLoginData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    toast.info('Authentication is now handled by ApperUI');
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    toast.info('Google authentication is now handled by ApperUI');
    setTimeout(() => setGoogleLoading(false), 1000);
  };

  const handleRoleConfirmation = () => {
    setLoading(true);
    toast.info('Role confirmation is now handled by ApperUI');
    setTimeout(() => {
      setLoading(false);
      setShowRoleSelector(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    setShowRoleSelector(false);
    setLoginData(null);
    setSelectedRole('customer');
    setLoading(false);
  };

  if (showRoleSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-strong p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
                <ApperIcon name="Users" size={28} className="text-primary-600" />
              </div>
              <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Choose Your Role
              </h1>
              <p className="text-gray-600">
                How would you like to use the app?
              </p>
            </div>

            <div className="space-y-4">
              {[
                { id: 'customer', label: 'Customer', icon: 'ShoppingBag', desc: 'Browse and order products' },
                { id: 'vendor', label: 'Vendor', icon: 'Store', desc: 'Manage your products and orders' },
                { id: 'delivery', label: 'Delivery Partner', icon: 'Truck', desc: 'Handle deliveries and logistics' }
              ].map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedRole === role.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedRole === role.id ? 'bg-primary-100' : 'bg-gray-100'
                    }`}>
                      <ApperIcon 
                        name={role.icon} 
                        size={20} 
                        className={selectedRole === role.id ? 'text-primary-600' : 'text-gray-600'} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        selectedRole === role.id ? 'text-primary-900' : 'text-gray-900'
                      }`}>
                        {role.label}
                      </h3>
                      <p className="text-sm text-gray-500">{role.desc}</p>
                    </div>
                    {selectedRole === role.id && (
                      <ApperIcon name="Check" size={20} className="text-primary-600" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="flex space-x-3 mt-8">
              <Button
                variant="outline"
                onClick={handleBackToLogin}
                className="flex-1"
              >
                <ApperIcon name="ArrowLeft" size={16} className="mr-2" />
                Back
              </Button>
              <Button
                onClick={handleRoleConfirmation}
                className="flex-1"
              >
                <ApperIcon name="Check" size={16} className="mr-2" />
                Continue
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-strong p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
              <ApperIcon name="Lock" size={28} className="text-primary-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'border-error focus:ring-error' : ''}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error flex items-center">
                  <ApperIcon name="AlertCircle" size={14} className="mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'border-error focus:ring-error' : ''}
              />
              {errors.password && (
<p className="mt-1 text-sm text-error flex items-center">
                  <ApperIcon name="AlertCircle" size={14} className="mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <ApperIcon name="LogIn" size={16} className="mr-2" />
                  Sign In
                </>
              )}
            </Button>
</form>

          {/* Google Login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50"
              size="lg"
            >
              {googleLoading ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="animate-spin mr-2" />
                  Connecting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
          </div>

          {/* Demo Login */}
{/* Demo credentials section removed - authentication handled by ApperUI */}

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our terms of service
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}