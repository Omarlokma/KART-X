import React from 'react'
import { Link } from 'react-router-dom'
import './Notfound.css'

export default function Notfound() {
  return (
    <div className="notfound-page">
      <div className="notfound-number">404</div>
      <div className="notfound-card">
        <p className="notfound-oops">Oops.</p>
        <p className="notfound-msg">
          This page got lost. We couldn't find the drop you're looking for.
        </p>
        <Link to="/" className="notfound-btn">
          <i className="fas fa-arrow-left"></i> GO BACK HOME
        </Link>
      </div>
    </div>
  )
}
