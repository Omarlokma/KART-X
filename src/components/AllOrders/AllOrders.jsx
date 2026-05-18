import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './AllOrders.css'

export default function AllOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // Fetch orders from local storage
    const savedOrders = JSON.parse(localStorage.getItem('localOrders')) || []
    setOrders(savedOrders)
  }, [])

  return (
    <div className="kx-orders-page">
      <div className="container">
        <div className="kx-section-header">
          <div>
            <h1 className="kx-section-title">MY ORDERS</h1>
            <div className="kx-title-line"></div>
          </div>
          <Link to="/" className="kx-see-all-btn">
            CONTINUE SHOPPING <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="kx-empty-orders">
            <div className="kx-empty-icon"><i className="fas fa-box-open"></i></div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders. Start exploring our collections!</p>
            <Link to="/" className="kx-btn-solid">EXPLORE PRODUCTS</Link>
          </div>
        ) : (
          <div className="kx-orders-list">
            {orders.map((order) => (
              <div key={order.id} className="kx-order-card">
                <div className="kx-order-header">
                  <div className="kx-order-info">
                    <span className="kx-order-id">Order #{order.id}</span>
                    <span className="kx-order-date">{order.date}</span>
                  </div>
                  <div className="kx-order-total">
                    TOTAL: <span>{order.totalPrice} EGP</span>
                  </div>
                </div>

                <div className="kx-order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="kx-order-item">
                      <img src={item.product.imageCover} alt={item.product.title} />
                      <div className="kx-item-details">
                        <h4>{item.product.title.split(' ').slice(0, 3).join(' ')}</h4>
                        <p>Brand: {item.product.brand?.name}</p>
                        <div className="kx-item-price-qty">
                          <span className="kx-item-price">{item.price} EGP</span>
                          <span className="kx-item-qty">Qty: {item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="kx-order-footer">
                  <div className="kx-shipping-info">
                    <strong>Shipping To:</strong> {order.shippingAddress.city}, {order.shippingAddress.details} ({order.shippingAddress.phone})
                  </div>
                  <div className="kx-order-status">
                    <span className="kx-status-badge">Processing</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
