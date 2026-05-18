import { createContext, useState, useEffect } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartCount, setCartCount] = useState(0);

  function getHeaders() {
    return { token: localStorage.getItem('userToken') };
  }

  // 1. Add to Cart
  function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
      { headers: getHeaders() }
    )
    .then((response) => {
      setCartCount(response.data.numOfCartItems);
      return response;
    })
    .catch((error) => error);
  }

  // 2. Get Cart
  function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: getHeaders() }
    )
    .then((response) => {
      setCartCount(response.data.numOfCartItems);
      return response;
    })
    .catch((error) => error);
  }

  // 3. Remove Item
  function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: getHeaders() }
    )
    .then((response) => {
      setCartCount(response.data.numOfCartItems);
      return response;
    })
    .catch((error) => error);
  }

  // 4. Update Quantity
  function updateCartProductQuantity(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count },
      { headers: getHeaders() }
    )
    .then((response) => {
      setCartCount(response.data.numOfCartItems);
      return response;
    })
    .catch((error) => error);
  }

  // 5. Clear Cart
  function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: getHeaders() }
    )
    .then((response) => {
      setCartCount(0);
      return response;
    })
    .catch((error) => error);
  }

  // 6. Online Payment (Stripe Checkout)
  function onlinePayment(cartId, url, shippingAddress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress: shippingAddress },
      { headers: getHeaders() }
    )
    .then((response) => response)
    .catch((error) => error);
  }

  // Get cart count initially when app loads
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getLoggedUserCart();
    }
  }, []);

  return (
    <CartContext.Provider value={{ 
      addProductToCart, 
      getLoggedUserCart, 
      removeCartItem, 
      updateCartProductQuantity, 
      clearCart, 
      onlinePayment,
      cartCount, 
      setCartCount 
    }}>
      {props.children}
    </CartContext.Provider>
  );
}
