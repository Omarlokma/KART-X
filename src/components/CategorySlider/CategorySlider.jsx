import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './CategorySlider.css';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) return null; // Don't show anything while loading categories (to avoid empty space or layout shift)

  return (
    <div className="category-slider-container">
      <div className="category-header-wrap">
        <span className="category-subtitle">TRENDING</span>
        <h2 className="category-slider-title">SHOP BY CATEGORY</h2>
      </div>
      
      <div className="category-swiper-wrapper">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={2}
          spaceBetween={15}
          loop={true}
          navigation={{ nextEl: '.cat-next', prevEl: '.cat-prev' }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.cat-dots' }}
          breakpoints={{
            // when window width is >= 576px
            576: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            // when window width is >= 992px
            992: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div className="category-slide-item">
                <div className="category-img-wrapper">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="category-img" 
                  />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom nav arrows */}
        <button className="cat-prev"><i className="fas fa-arrow-left"></i></button>
        <button className="cat-next"><i className="fas fa-arrow-right"></i></button>
      </div>

      {/* Pagination dots */}
      <div className="cat-dots"></div>
    </div>
  );
}
