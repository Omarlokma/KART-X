import React, { useState, useContext } from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';

export default function Login() {
  let navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(formData) {
    setIsLoading(true);
    setApiError(null);
    try {
      let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formData);
      if (response.data.message === 'success') {
        localStorage.setItem('userToken', response.data.token);
        setUserToken(response.data.token);
        navigate('/');
      }
    } catch (error) {
      setApiError(error.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string().required('Password is required'),
  });

  let formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <section className="auth-section">

      {/*  Left Brand Panel  */}
      <div className="auth-panel-left auth-panel-dark">
        <div className="auth-brand-logo">KART <span>X</span></div>
        <p className="auth-brand-tagline">UNAPOLOGETIC COMMERCE.<br/>RAW ENERGY.</p>
        <ul className="auth-brand-perks">
          <li><i className="fas fa-check"></i> Exclusive drops</li>
          <li><i className="fas fa-check"></i> Raw style</li>
          <li><i className="fas fa-check"></i> Fast delivery</li>
        </ul>
      </div>

      {/* Form Panel  */}
      <div className="auth-panel-right">
        <div className="auth-form-box">
          <div className="auth-badge">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <h1 className="auth-form-title">SIGN IN</h1>
          <p className="auth-form-subtitle">Enter your details to proceed.</p>

          {apiError && (
            <div className="auth-alert auth-alert-error">
              <i className="fas fa-triangle-exclamation"></i>
              {apiError}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="auth-form">

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
              <label htmlFor="password">
                Password
                <a href="#!" className="forgot-link">Forgot password?</a>
              </label>
              <div className="input-wrapper">
                <i className="fas fa-lock input-icon"></i>
                <input
                  onChange={formik.handleChange} onBlur={formik.handleBlur}
                  type="password" name="password" id="password" value={formik.values.password}
                  placeholder="Enter your password"
                  className={`auth-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="error-msg"><i className="fas fa-circle-exclamation"></i> {formik.errors.password}</span>
              )}
            </div>

            <button className="auth-btn" type="submit" disabled={isLoading}>
              {isLoading
                ? <><i className="fas fa-spinner fa-spin"></i> Signing in...</>
                : <><i className="fas fa-arrow-right"></i> Sign In</>
              }
            </button>

            <p className="auth-switch">
              New to KART X? <Link to="/register" className="auth-link">JOIN THE MOVEMENT</Link>
            </p>
          </form>
        </div>
      </div>

    </section>
  );
}
