import React, { useState, useContext } from 'react'
import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import toast from 'react-hot-toast'
import './ProductDetails.css'

export default function ProductDetails() {
  const product = useLoaderData();
  const { addProductToCart } = useContext(CartContext);
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(product.imageCover);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart() {
    if (!userToken) {
      toast.error(
        (t) => (
          <span>
            Please{' '}
            <a
              onClick={() => { toast.dismiss(t.id); navigate('/login'); }}
              style={{ color: '#ff6b35', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              sign in
            </a>
            {' '}to add items to your cart.
          </span>
        ),
        { duration: 4000 }
      )
      return
    }
    setIsAdding(true);
    let response = await addProductToCart(product._id || product.id);
    if (response?.data?.status === 'success') {
      toast.success(response.data.message || 'Product added to cart!')
    } else {
      toast.error('Failed to add product to cart')
    }
    setIsAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const allImages = [product.imageCover, ...(product.images || [])];

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.round(rating) ? 'star-filled' : 'star-empty'}`}
      ></i>
    ));
  }

  return (
    <div className="pd-page">

      {/* Breadcrumb */}
      <nav className="pd-breadcrumb">
        <Link to="/">Products</Link>
        <i className="fas fa-chevron-right"></i>
        <span>{product.category?.name}</span>
        <i className="fas fa-chevron-right"></i>
        <span className="pd-breadcrumb-current">
          {product.title.split(' ').slice(0, 3).join(' ')}
        </span>
      </nav>

      <div className="pd-container">

        {/* ── Left: Images ── */}
        <div className="pd-gallery">
          <div className="pd-main-img-wrap">
            {product.priceAfterDiscount && (
              <span className="discount-badge">
                -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
              </span>
            )}
            <img src={selectedImg} alt={product.title} className="pd-main-img" />
          </div>

          {allImages.length > 1 && (
            <div className="pd-thumbnails">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${selectedImg === img ? 'active' : ''}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt={`view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div className="pd-info">
          <span className="pd-category">{product.category?.name}</span>
          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-meta">
            <span className="pd-brand">
              <i className="fas fa-tag"></i> {product.brand?.name}
            </span>
            <span className="pd-sold">
              <i className="fas fa-fire"></i> {product.sold} sold
            </span>
          </div>

          {/* Rating */}
          <div className="pd-rating">
            <div className="stars">{renderStars(product.ratingsAverage)}</div>
            <span className="rating-count">
              {product.ratingsAverage?.toFixed(1)} ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="pd-price-block">
            {product.priceAfterDiscount ? (
              <>
                <span className="pd-price-new">{product.priceAfterDiscount} EGP</span>
                <span className="pd-price-old">{product.price} EGP</span>
                <span className="pd-saving">
                  You save {product.price - product.priceAfterDiscount} EGP
                </span>
              </>
            ) : (
              <span className="pd-price-new">{product.price} EGP</span>
            )}
          </div>

          {/* Description */}
          <div className="pd-description">
            <h4>Description</h4>
            <p>{product.description}</p>
          </div>

          {/* Stock */}
          <div className="pd-stock">
            <i className="fas fa-box"></i>
            <span>{product.quantity} items in stock</span>
          </div>

          {/* Actions */}
          <div className="pd-actions">
            <button
              className={`pd-cart-btn ${added ? 'pd-cart-btn-added' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? (
                <><i className="fas fa-spinner fa-spin"></i> ADDING...</>
              ) : added ? (
                <><i className="fas fa-check"></i> ADDED!</>
              ) : (
                <><i className="fas fa-cart-plus"></i> ADD TO CART <i className="fas fa-arrow-right"></i></>
              )}
            </button>
            <button className="pd-wish-btn">
              <i className="fas fa-heart"></i>
            </button>
          </div>

          {/* Perks */}
          <div className="pd-perks">
            <div className="pd-perk">
              <i className="fas fa-truck-fast"></i>
              <span>Free delivery on orders over 500 EGP</span>
            </div>
            <div className="pd-perk">
              <i className="fas fa-rotate-left"></i>
              <span>Easy 30-day returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
