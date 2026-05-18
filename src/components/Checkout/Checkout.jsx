import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import * as Yup from 'yup'
import './Checkout.css'

export default function Checkout() {
  const { cartId } = useParams()
  const { onlinePayment, getLoggedUserCart } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

  const validationSchema = Yup.object({
    details: Yup.string().required('Address is required').min(3, 'Min 3 characters'),
    phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
    city: Yup.string().required('City is required')
  })

  async function handleCheckout(values) {
    setIsLoading(true)
    setPaymentError(null)

    // Save cart locally as an order
    const cartRes = await getLoggedUserCart()
    if (cartRes?.data?.data) {
      const newOrder = {
        id: Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString('en-GB'),
        items: cartRes.data.data.products,
        totalPrice: cartRes.data.data.totalCartPrice,
        shippingAddress: values
      }
      const existingOrders = JSON.parse(localStorage.getItem('localOrders')) || []
      localStorage.setItem('localOrders', JSON.stringify([newOrder, ...existingOrders]))
    }

    const baseUrl = `${window.location.origin}${window.location.pathname}#/allorders`
    const response = await onlinePayment(cartId, baseUrl, values)
    if (response?.data?.status === 'success') {
      window.location.href = response.data.session.url
    } else {
      setPaymentError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: { details: '', phone: '', city: '' },
    validationSchema,
    onSubmit: handleCheckout
  })

  return (
    <div className="kx-checkout-page">

      {/* Top bar */}
      <div className="kx-checkout-topbar container-fluid">
        <div className="kx-checkout-logo">KART <span>X</span></div>
        <Link to="/carts" className="kx-back-link">
          <i className="fas fa-arrow-left"></i> BACK TO CART
        </Link>
      </div>

      {/* Form Card */}
      <div className="kx-checkout-wrap">
        <div className="kx-checkout-card">

          <div className="kx-checkout-card-header">
            <h1 className="kx-checkout-title">CHECKOUT</h1>
            <p className="kx-checkout-subtitle">Complete your order securely.</p>
            <hr className="kx-co-divider" />
          </div>

          {paymentError && (
            <div className="kx-co-error">
              <i className="fas fa-triangle-exclamation"></i> {paymentError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            {/* Shipping Section */}
            <div className="kx-co-section-label">
              <i className="fas fa-truck"></i> SHIPPING INFO
            </div>

            <div className="kx-co-field">
              <label>ADDRESS</label>
              <input
                type="text"
                name="details"
                placeholder="123 Street Name, Apt 4"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.errors.details && formik.touched.details ? 'kx-co-input error' : 'kx-co-input'}
              />
              {formik.errors.details && formik.touched.details && (
                <span className="kx-co-error-msg">{formik.errors.details}</span>
              )}
            </div>

            <div className="row g-2">
              <div className="col-7">
                <div className="kx-co-field">
                  <label>CITY</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Cairo"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.city && formik.touched.city ? 'kx-co-input error' : 'kx-co-input'}
                  />
                  {formik.errors.city && formik.touched.city && (
                    <span className="kx-co-error-msg">{formik.errors.city}</span>
                  )}
                </div>
              </div>
              <div className="col-5">
                <div className="kx-co-field">
                  <label>PHONE</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="010XXXXXXXX"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.phone && formik.touched.phone ? 'kx-co-input error' : 'kx-co-input'}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <span className="kx-co-error-msg">{formik.errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <hr className="kx-co-divider mt-3" />

            {/* Pay Button */}
            <button
              type="submit"
              className="kx-pay-btn"
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {isLoading ? (
                <><i className="fas fa-spinner fa-spin"></i> PROCESSING...</>
              ) : (
                <><i className="fas fa-lock"></i> PAY NOW</>
              )}
            </button>

            <p className="kx-stripe-note">
              <i className="fas fa-shield-halved"></i> SECURED VIA STRIPE
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
