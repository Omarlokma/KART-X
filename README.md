# 🛒 KART X — E-commerce Platform

> A modern, full-featured e-commerce web application built with React.js, featuring a bold **Neobrutalist** design identity.

🔗 **Live Demo:** [https://omarlokma.github.io/KART-X/](https://omarlokma.github.io/KART-X/)

---

## 📸 Preview

![KART X Homepage](https://omarlokma.github.io/KART-X/preview.png)

---

## ✨ Features

- 🛍️ **Product Browsing** — Browse all products and categories without needing to log in
- 🔐 **Authentication** — Secure Register & Login with protected routes
- 🛒 **Cart Management** — Add, remove, and update product quantities in real-time
- 💳 **Stripe Checkout** — Secure online payment integration via Stripe
- 📦 **Order History** — Local order tracking stored in the browser (LocalStorage)
- 🔔 **Toast Notifications** — Real-time feedback for all user actions (react-hot-toast)
- 📱 **Fully Responsive** — Optimized layout for Desktop, Tablet & Mobile
- 🎨 **Neobrutalist UI** — Bold borders, hard shadows, and sharp geometric design

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **React.js 19** | Core UI framework |
| **Vite** | Build tool & dev server |
| **React Router DOM v7** | Client-side routing (HashRouter) |
| **Context API** | Global state (Cart & User) |
| **Axios** | HTTP requests to REST API |
| **Formik + Yup** | Form handling & validation |
| **Swiper.js** | Hero & Category sliders |
| **react-hot-toast** | Toast notifications |
| **FontAwesome** | Icons |
| **Google Fonts** | Syne + Space Grotesk typography |
| **gh-pages** | GitHub Pages deployment |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Navbar/            # Responsive navigation bar
│   ├── Layout/            # Main layout wrapper
│   ├── Products/          # Home page with product grid
│   ├── ProductDetails/    # Single product detail page
│   ├── CategorySlider/    # Swiper category carousel
│   ├── HeroSlider/        # Hero banner slider
│   ├── Carts/             # Shopping cart page
│   ├── Checkout/          # Checkout form + Stripe integration
│   ├── AllOrders/         # Order history page
│   ├── Brands/            # Brands listing page
│   ├── Login/             # Login form
│   ├── Register/          # Register form
│   ├── ProtectedRoute/    # Route guard component
│   ├── Loader/            # Loading spinner
│   └── Notfound/          # 404 page
├── context/
│   ├── CartContext.jsx    # Cart state & API calls
│   └── UserContext.jsx    # Auth state management
├── loaders/
│   └── loaders.js         # React Router data loaders
└── App.jsx                # Router setup & app entry
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Omarlokma/KART-X.git

# Navigate to project folder
cd KART-X

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment

This project is deployed on **GitHub Pages** using `gh-pages`.

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

---

## 🔑 Key Implementation Details

### Guest Browsing
Users can freely browse products without signing in. Authentication is only required for Cart, Checkout, and Orders pages.

### Order History (LocalStorage)
Since the API doesn't provide an order history endpoint, orders are saved locally in the browser using `localStorage` before redirecting to Stripe — giving users a persistent order record.

### HashRouter for GitHub Pages
The app uses `createHashRouter` instead of `createBrowserRouter` to ensure proper routing on GitHub Pages, which doesn't support server-side URL rewriting.

### Post-Payment Redirect
After a successful Stripe payment, the user is redirected directly to the **My Orders** page to see their confirmed order.

---

## 📡 API

This project consumes the **Route Academy E-commerce API**:

```
Base URL: https://ecommerce.routemisr.com/api/v1
```

---

## 👤 Author

**Omar Lokma**
- GitHub: [@Omarlokma](https://github.com/Omarlokma)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
