import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2 className="footer-logo">KART <span>X</span></h2>
          <p className="footer-tagline">
            Exclusive drops. Uncompromising aesthetic. Your premier destination for streetwear and premium lifestyle gear.
          </p>
          <div className="footer-social">
            <a href="#!" className="social-btn" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="social-btn" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#!" className="social-btn" aria-label="Twitter">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="#!" className="social-btn" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/">All Products</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/carts">My Cart</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Account</h4>
          <ul className="footer-links">
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><a href="#!">Help Center</a></li>
            <li><a href="#!">Track Order</a></li>
            <li><a href="#!">Returns</a></li>
            <li><a href="#!">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} <strong>KART X</strong>. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
          <a href="#!">Cookies</a>
        </div>
      </div>
    </footer>
  )
}
