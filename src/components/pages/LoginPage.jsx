import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, any valid email/password combination works
      if (formData.email && formData.password) {
        toast.success('Welcome! Successfully logged in');
        onLogin(formData.email);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      setErrors({
        password: 'Invalid email or password'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123'
    });
    setErrors({});
  };

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

          {/* Demo Login */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">
              Want to try the app quickly?
            </p>
            <Button
              variant="outline"
              onClick={handleDemoLogin}
              className="w-full"
              size="sm"
            >
              <ApperIcon name="Zap" size={14} className="mr-2" />
              Fill Demo Credentials
            </Button>
          </div>

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