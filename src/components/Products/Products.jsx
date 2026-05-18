import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { CartContext } from '../../context/CartContext'
import CategorySlider from '../CategorySlider/CategorySlider'
import HeroSlider from '../HeroSlider/HeroSlider'
import toast from 'react-hot-toast'
import './Products.css'

export default function Products() {
  const [product, setProduct] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [loadingId, setLoadingId] = useState(null)
  const { addProductToCart } = useContext(CartContext)

  async function addProductItem(id) {
    setLoadingId(id)
    let response = await addProductToCart(id)
    if (response?.data?.status === 'success') {
      toast.success(response.data.message || 'Product added to cart!')
    } else {
      toast.error('Failed to add product to cart')
    }
    setLoadingId(null)
  }

  function getProducts() {
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setProduct(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getProducts()
  }, [])

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < Math.round(rating) ? 'star-filled' : 'star-empty'}`}
      ></i>
    ));
  }

  return (
    <div className="products-page">

      {isLoading ? <Loader /> : (
        <>
          <HeroSlider />

          <div className="container">
            <div className="kx-section-header">
              <div>
                <h1 className="kx-section-title">PRODUCTS</h1>
                <div className="kx-title-line"></div>
              </div>
              <a href="#products-grid" className="kx-see-all-btn">
                SEE ALL <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <CategorySlider />

            <div className="products-grid" id="products-grid">
            {product.map((productInfo) => (
              <div key={productInfo.id} className="kx-product-card">

                {/* Image */}
                <Link to={`/product/${productInfo.id}`} className="kx-card-img-link">
                  <div className="kx-card-img-wrap">
                    <img
                      src={productInfo.imageCover}
                      alt={productInfo.title}
                      className="kx-card-img"
                      loading="lazy"
                    />
                    {productInfo.priceAfterDiscount && (
                      <span className="kx-discount-pill">
                        -{Math.round(((productInfo.price - productInfo.priceAfterDiscount) / productInfo.price) * 100)}%
                      </span>
                    )}
                  </div>
                </Link>

                {/* Body */}
                <div className="kx-card-body">
                  <span className="kx-card-category">{productInfo.category?.name}</span>
                  <h3 className="kx-card-name">
                    {productInfo.title.split(' ').slice(0, 4).join(' ')}
                  </h3>
                  <span className="kx-card-brand">
                    <i className="fas fa-tag"></i> {productInfo.brand?.name}
                  </span>

                  <div className="kx-card-rating">
                    <div className="kx-stars">
                      {renderStars(productInfo.ratingsAverage)}
                    </div>
                    <span className="kx-rating-count">({productInfo.ratingsQuantity})</span>
                  </div>

                  <div className="kx-card-price">
                    {productInfo.priceAfterDiscount ? (
                      <>
                        <span className="kx-price-new">{productInfo.priceAfterDiscount} EGP</span>
                        <span className="kx-price-old">{productInfo.price} EGP</span>
                      </>
                    ) : (
                      <span className="kx-price-new">{productInfo.price} EGP</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  className="kx-card-cart-btn"
                  onClick={() => addProductItem(productInfo.id)}
                  disabled={loadingId === productInfo.id}
                >
                  {loadingId === productInfo.id
                    ? <><i className="fas fa-spinner fa-spin"></i> ADDING...</>
                    : <><i className="fas fa-cart-shopping"></i> ADD TO CART</>
                  }
                </button>

              </div>
            ))}
            </div>
          </div>
        </>
      )}

    </div>
  )
}
