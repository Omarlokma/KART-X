import './App.css'
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Brands from './components/Brands/Brands'
import Carts from './components/Carts/Carts'
import Notfound from './components/Notfound/Notfound'
import ProductDetails from './components/ProductDetails/ProductDetails'
import UserContextProvider from './context/UserContext'
import CartContextProvider from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Checkout from './components/Checkout/Checkout'
import AllOrders from './components/AllOrders/AllOrders'
import { productsLoader, productDetailsLoader } from './loaders/loaders'

function App() {
  let paths = createHashRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true,         element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'product/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute>, loader: productDetailsLoader },
        { path: 'brands',      element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'carts',       element: <ProtectedRoute><Carts /></ProtectedRoute> },
        { path: 'login',       element: <Login /> },
        { path: 'register',    element: <Register /> },
        { path: 'allorders',   element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: '*',           element: <Notfound /> },
      ]
    },
    { path: 'checkout/:cartId', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
  ])

  return (
    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={paths} />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              border: '3px solid #111',
              borderRadius: '8px',
              background: '#fff',
              color: '#111',
              boxShadow: '4px 4px 0 #ff6b35',
              fontWeight: '600',
              fontFamily: 'Space Grotesk, sans-serif'
            },
            success: {
              iconTheme: {
                primary: '#111',
                secondary: '#00e676',
              },
            },
          }} 
        />
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App
