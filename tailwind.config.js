/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D84315',
          50: '#FBE9E7',
          100: '#FFCCBC',
          200: '#FFAB91',
          300: '#FF8A65',
          400: '#FF7043',
          500: '#D84315',
          600: '#BF360C',
          700: '#A6220F',
          800: '#8E2012',
          900: '#6D1B0C'
        },
        secondary: {
          DEFAULT: '#FFA726',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100'
        },
        accent: {
          DEFAULT: '#43A047',
          50: '#E8F5E8',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#43A047',
          600: '#388E3C',
          700: '#2E7D32',
          800: '#1B5E20',
          900: '#0D4A11'
        },
        error: '#E53935',
        warning: '#FB8C00',
        info: '#1976D2',
        success: '#43A047'
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'sans': ['Inter', 'sans-serif']
      },
      borderRadius: {
        'xl': '12px'
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}