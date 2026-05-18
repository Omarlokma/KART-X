import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <nav className='kx-nav'>
      <NavLink to='/' className='kx-logo'>
        KART <span>X</span>
      </NavLink>

      {/* Collapsible Menu */}
      <div className={`kx-nav-collapse ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className='kx-nav-links'>
          <li><NavLink to='' end onClick={() => setIsMobileMenuOpen(false)}>SHOP</NavLink></li>
          <li><NavLink to='brands' onClick={() => setIsMobileMenuOpen(false)}>BRANDS</NavLink></li>
          <li><NavLink to='allorders' onClick={() => setIsMobileMenuOpen(false)}>ORDERS</NavLink></li>
        </ul>

        <div className='kx-nav-actions'>
          {/* Cart Icon (Desktop) */}
          <NavLink to='carts' className='kx-cart-btn kx-desktop-cart'>
            <i className="fas fa-cart-shopping"></i>
            {cartCount > 0 && <span className="kx-cart-badge">{cartCount}</span>}
          </NavLink>

          {!userToken ? (
            <>
              <NavLink to='login' className='kx-btn-outline' onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fas fa-right-to-bracket"></i> Login
              </NavLink>
              <NavLink to='register' className='kx-btn-solid' onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fas fa-user-plus"></i> Register
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className='kx-btn-solid kx-logout'>
              <i className='fas fa-right-from-bracket'></i> Logout
            </button>
          )}
        </div>
      </div>

      <div className="kx-nav-right-mobile">
        {/* Cart Icon (Mobile) */}
        <NavLink to='carts' className='kx-cart-btn kx-mobile-cart'>
          <i className="fas fa-cart-shopping"></i>
          {cartCount > 0 && <span className="kx-cart-badge">{cartCount}</span>}
        </NavLink>

        {/* Mobile Toggle Button */}
        <button className="kx-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-list-ul'}`}></i>
        </button>
      </div>
    </nav>
  )
}
