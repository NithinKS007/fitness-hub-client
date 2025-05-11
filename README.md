# FT-HUB - Connect with Your Personal Trainer

FT-Hub is an innovative online platform designed to seamlessly connect fitness enthusiasts with professional trainers. Offering features such as online booking, real-time chat support, a content-rich library, and subscription-based services, FT-Hub is the ultimate solution for anyone looking to take their fitness journey to the next level. Whether you're seeking personalized workout plans, professional advice, or the convenience of booking sessions online, FT-Hub provides a comprehensive and user-friendly experience.

## 🌟 Features

1. **Trainer-User Connection**  
   - Browse and filter trainers based on expertise, availability, and customer reviews to find the perfect match.

2. **Online Booking System**  
   - Book personal or group sessions directly with trainers, selecting preferred time slots from real-time availability.

3. **Real-Time Chat Support**  
   - Instantly connect with trainers for advice, guidance, and support via integrated chat.

4. **Fitness Content Library**  
   - Upload and share exclusive workout videos, routines, nutrition guides, and expert-led articles. Regular updates from trainers to keep content fresh and engaging.

5. **Subscription Plans**  
   - Choose from flexible subscription options for access to content, chat support, and booking services.

6. **Progress Tracking & Goals**  
   - Track your fitness progress, set personalized goals, and log workouts to stay on top of your journey.

7. **Secure Payment Integration**  
   - Seamlessly pay for subscriptions and bookings through Stripe’s secure payment system.

## 📁 Project Structure

```
CLIENT/
├── .env                        # Environment variables
├── .gitignore                  # Git ignore configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Project dependencies and scripts
├── package-lock.json           # Package lock for npm
├── README.md                   # Project documentation
├── tsconfig.app.json           # TypeScript configuration for app-specific settings
├── tsconfig.json               # General TypeScript configuration
├── tsconfig.node.json          # General TypeScript configuration for Node
├── vite.config.ts              # Vite configuration for the development environment

├── dist/                       # Distribution folder for build output
│   └── ...
├── node_modules/               # Node.js modules
│   └── ...
├── public/                     # Public assets (images, fonts, etc.)
│   ├── assets/                 # Place for images, logos, etc.
│   └── index.html              # The main HTML file
├── src/                        # Source code
│   ├── components/             # Reusable UI components
│   ├── config/                 # Configuration files
│   ├── hooks/                  # Custom React hooks
│   ├── layouts/                # Layout components
│   ├── pages/                  # React page components
│   ├── redux/                  # Redux store
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions/helpers
│   ├── App.tsx                 # Root component
│   ├── index.tsx               # Entry point for React app
│   └── index.css               # Global styles (CSS)

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.15.0 or higher)
- npm (Node Package Manager)
- MongoDB (for local database use; or use MongoDB Atlas for cloud hosting)
- Stripe account (for subscription payment integration)
- Google account (for authentication via Google)
- Cloudinary account (for image and video hosting)
- Zego Cloud account (for video call functionality)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fitness-hub-client.git

cd CLIENT
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## 📦 Package Analysis

### Current Dependencies Analysis

#### Required Packages (Keep)

```json
{
  "@cloudinary/react": "^1.14.1", // For integrating Cloudinary's React components
  "@cloudinary/url-gen": "^1.21.0", // Cloudinary URL generator for image and video URLs
  "@emotion/react": "^11.14.0", // For styling React components with Emotion
  "@emotion/styled": "^11.14.0", // Emotion styled components library
  "@mui/icons-material": "^6.4.7", // Material UI icons
  "@mui/material": "^6.4.9", // Core Material UI components
  "@mui/x-data-grid": "^7.26.0", // Material UI's Data Grid component for table and data management
  "@mui/x-date-pickers": "^7.27.3", // Material UI's date picker components
  "@react-oauth/google": "^0.12.1", // Google OAuth login integration for React
  "@reduxjs/toolkit": "^2.5.1", // Redux Toolkit for simplified state management
  "@stripe/react-stripe-js": "^3.1.1", // Stripe React library for payments integration
  "@stripe/stripe-js": "^5.7.0", // Stripe JavaScript library for payment gateway
  "@tailwindcss/vite": "^4.0.3", // Tailwind CSS integration with Vite
  "axios": "^1.7.9", // HTTP client for making requests
  "date-fns": "^2.30.0", // Date manipulation library
  "dayjs": "^1.11.13", // Lightweight date library for formatting dates
  "dotenv": "^16.4.7", // Loads environment variables from `.env` files
  "emoji-picker-react": "^4.12.2", // Emoji picker component for React
  "formik": "^2.4.6", // Form management library for React
  "framer-motion": "^12.6.3", // Animation library for React
  "lucide-react": "^0.475.0", // Icon library for React
  "mui-one-time-password-input": "^3.0.2", // OTP input component for Material UI
  "pdf": "^0.1.0", // Generic PDF processing library
  "pdfjs-dist": "^4.10.38", // PDF.js library for rendering PDFs
  "react": "^18.3.1", // React library for building user interfaces
  "react-dom": "^18.3.1", // React DOM for rendering React components
  "react-icons": "^5.4.0", // Icon library for React components
  "react-pdf": "^9.2.1", // React component to display PDF files
  "react-redux": "^9.2.0", // Redux integration with React
  "react-router-dom": "^7.1.5", // React Router for routing in React apps
  "react-toastify": "^11.0.3", // Toast notifications library for React
  "recharts": "^2.15.1", // Charting library for React
  "redux-persist": "^6.0.0", // Persist Redux state across page reloads
  "redux-thunk": "^3.1.0", // Middleware for handling async actions in Redux
  "socket.io-client": "^4.8.1", // Socket.io client for real-time communication
  "stripe": "^17.7.0", // Stripe library for handling payments
  "yup": "^1.6.1" // Schema validation library, used with Formik
}
```

#### Development Dependencies (Keep)

```json
{
  "@eslint/js": "^9.17.0", // ESLint core JavaScript configurations
  "@types/express": "^5.0.0", // Type definitions for Express.js (if using for backend)
  "@types/react": "^18.3.18", // Type definitions for React
  "@types/react-dom": "^18.3.5", // Type definitions for React DOM
  "@types/socket.io-client": "^1.4.36", // Type definitions for socket.io client
  "@types/stripe": "^8.0.416", // Type definitions for Stripe.js
  "@vitejs/plugin-react": "^4.3.4", // Vite plugin for React
  "autoprefixer": "^10.4.20", // Autoprefixer for adding vendor prefixes in CSS
  "eslint": "^9.17.0", // Linter for maintaining code quality
  "eslint-plugin-react-hooks": "^5.0.0", // ESLint plugin for React Hooks linting
  "eslint-plugin-react-refresh": "^0.4.16", // ESLint plugin for React Fast Refresh
  "globals": "^15.14.0", // Provide global variables for linting
  "postcss": "^8.5.2", // PostCSS for transforming CSS
  "tailwindcss": "^4.0.6", // Tailwind CSS framework for utility-first CSS styling
  "typescript": "^5.7.3", // TypeScript for static type-checking
  "typescript-eslint": "^8.18.2", // TypeScript support for ESLint
  "vite": "^6.0.5" // Vite for fast and efficient builds with HMR (Hot Module Replacement)
}
```

#### 🛠️ Technology Stack

**React** - UI library  
**Vite** - Build tool  
**Tailwind CSS** - Styling  
**PDF.js** - PDF processing  
**Axios** - HTTP client  
**Formik** - Form handling  
**Redux** - State management  
**React Router** - Routing  
**React Toastify** - Notifications  
**React Icons** - Icon library  
**Stripe** - Payments  
**Zego SDK** - Video calling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-Feature`)
3. Commit your changes (`git commit -m 'Add some my-Feature'`)
4. Push to the branch (`git push origin feature/my-Feature`)
5. Open a Pull Request
