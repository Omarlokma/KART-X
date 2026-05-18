import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import './Brands.css';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching brands:', err);
      setError('Failed to load brands. Please try again later.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="brands-page">
      <div className="container">
        <div className="brands-header">
          <h1 className="brands-title">Our Brands</h1>
          <p className="brands-subtitle">Explore top-quality products from your favorite brands</p>
        </div>

        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="brands-grid">
            {brands.map((brand) => (
              <div key={brand._id} className="brand-card">
                <div className="brand-img-wrapper">
                  <img src={brand.image} alt={brand.name} className="brand-img" loading="lazy" />
                </div>
                <h3 className="brand-name">{brand.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
