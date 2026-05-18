import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import './Carts.css'

export default function Carts() {
  const { getLoggedUserCart, removeCartItem, updateCartProductQuantity, clearCart } = useContext(CartContext)
  const [cart, setCart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  async function fetchCart() {
    setIsLoading(true)
    const response = await getLoggedUserCart()
    setCart(response?.data)
    setIsLoading(false)
  }

  async function handleRemove(productId) {
    setUpdatingId(productId)
    const response = await removeCartItem(productId)
    setCart(response?.data)
    setUpdatingId(null)
  }

  async function handleUpdate(productId, count) {
    if (count < 1) return
    setUpdatingId(productId)
    const response = await updateCartProductQuantity(productId, count)
    setCart(response?.data)
    setUpdatingId(null)
  }

  async function handleClear() {
    await clearCart()
    setCart(null)
  }

  useEffect(() => { fetchCart() }, [])

  if (isLoading) return <Loader />

  // ── Empty Cart ──
  if (!cart || cart.numOfCartItems === 0) {
    return (
      <div className="kx-cart-empty">
        <i className="fas fa-cart-shopping kx-empty-icon"></i>
        <h2 className="kx-empty-title">YOUR CART IS EMPTY</h2>
        <p className="kx-empty-msg">Looks like you haven't added anything yet.</p>
        <Link to="/" className="kx-empty-btn">
          <i className="fas fa-arrow-left"></i> START SHOPPING
        </Link>
      </div>
    )
  }

  return (
    <div className="kx-cart-page container">

      {/* ── KART X Header Block ── */}
      <div className="kx-cart-header-block">
        <h1 className="kx-cart-heading">YOUR CART</h1>
      </div>

      <div className="row g-4 mt-2">

        {/* ── Items Column ── */}
        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-3">
            {cart.data?.products.map((item) => (
              <div
                key={item._id}
                className={`kx-cart-item ${updatingId === item.product._id ? 'kx-item-updating' : ''}`}
              >
                {/* Image */}
                <img src={item.product.imageCover} alt={item.product.title} className="kx-item-img" />

                {/* Info */}
                <div className="kx-item-info">
                  <h3 className="kx-item-name">
                    {item.product.title.split(' ').slice(0, 5).join(' ').toUpperCase()}
                  </h3>
                  <span className="kx-item-category">{item.product.category?.name}</span>
                </div>

                {/* Price Badge */}
                <div className="kx-item-price-badge">
                  {item.price} EGP
                </div>

                {/* Qty Controls */}
                <div className="kx-qty-row">
                  <button
                    className="kx-qty-btn"
                    onClick={() => handleUpdate(item.product._id, item.count - 1)}
                    disabled={updatingId === item.product._id || item.count <= 1}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="kx-qty-value">{item.count}</span>
                  <button
                    className="kx-qty-btn"
                    onClick={() => handleUpdate(item.product._id, item.count + 1)}
                    disabled={updatingId === item.product._id}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>

                {/* Delete */}
                <button
                  className="kx-remove-btn"
                  onClick={() => handleRemove(item.product._id)}
                  disabled={updatingId === item.product._id}
                >
                  <i className="fas fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Clear All */}
          <button className="kx-clear-btn mt-3" onClick={handleClear}>
            <i className="fas fa-xmark"></i> CLEAR ALL
          </button>
        </div>

        {/* ── Summary Column ── */}
        <div className="col-12 col-lg-4">
          <div className="kx-summary-card">
            <h2 className="kx-summary-title">SUMMARY</h2>
            <hr className="kx-divider" />

            <div className="kx-summary-row">
              <span>Subtotal ({cart.numOfCartItems} items)</span>
              <span>{cart.data?.totalCartPrice?.toLocaleString()} EGP</span>
            </div>
            <div className="kx-summary-row">
              <span>Shipping</span>
              <span className="kx-free-badge">FREE</span>
            </div>

            <hr className="kx-divider" />

            <div className="kx-summary-total-row">
              <span>TOTAL</span>
              <span className="kx-total-price">{cart.data?.totalCartPrice?.toLocaleString()} EGP</span>
            </div>

            <Link to={`/checkout/${cart.data?._id}`} className="kx-checkout-btn">
              CHECKOUT <i className="fas fa-arrow-right"></i>
            </Link>

            <Link to="/" className="kx-continue-shopping">
              <i className="fas fa-arrow-left"></i> CONTINUE SHOPPING
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
