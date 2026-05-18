import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(formData) {
    setIsLoading(true);
    setApiError(null);
    try {
      let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formData);
      if (response.data.message === 'success') {
        navigate('/login');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min 3 characters').max(10, 'Max 10 characters'),
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    phone: Yup.string().required('Phone is required').matches(/^01[1250][0-9]{8}$/, 'Invalid Egyptian phone number'),
    password: Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{6,8}$/, 'Must start with uppercase, 7–9 chars'),
    rePassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  let formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <section className="auth-section">

      {/* ── Left Brand Panel (Orange) ── */}
      <div className="auth-panel-left auth-panel-orange">
        <div className="auth-brand-logo">KART <span>X</span></div>
        <p className="auth-brand-tagline">Join the movement.<br/>Exclusive drops, raw style,<br/>uncompromising aesthetic.</p>
      </div>

      <div className="auth-panel-right">
        <div className="auth-form-box">
          <h1 className="auth-form-title">Create Account</h1>
          <p className="auth-form-subtitle">Step into the archive. Start shopping now.</p>

          {apiError && (
            <div className="auth-alert auth-alert-error">
              <i className="fas fa-triangle-exclamation"></i>
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="auth-form">

            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="text" name="name" id="name" value={formik.values.name}
                  placeholder="Enter your name"
                  className={`auth-input ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.name}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="email" name="email" id="email" value={formik.values.email}
                  placeholder="you@example.com"
                  className={`auth-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.email}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <i className="fas fa-phone input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="tel" name="phone" id="phone" value={formik.values.phone}
                  placeholder="01XXXXXXXXX"
                  className={`auth-input ${formik.touched.phone && formik.errors.phone ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.phone}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="password" name="password" id="password" value={formik.values.password}
                  placeholder="Min 7 chars, start with uppercase"
                  className={`auth-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.password}</span>
              )}
            </div>

            <div className="auth-field">
              <label htmlFor="rePassword">Re-Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="password" name="rePassword" id="rePassword" value={formik.values.rePassword}
                  placeholder="Repeat your password"
                  className={`auth-input ${formik.touched.rePassword && formik.errors.rePassword ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.rePassword && formik.errors.rePassword && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.rePassword}</span>
              )}
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading
                ? <><i className="fas fa-spinner fa-spin"></i> Creating account...</>
                : <><i className="fas fa-arrow-right"></i> Create My Account</>
              }
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login" className="auth-link">Log In</Link>
            </p>
          </form>
        </div>
      </div>

    </section>
  );
}
