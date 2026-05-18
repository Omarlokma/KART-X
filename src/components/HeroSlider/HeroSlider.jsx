import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroSlider.css';

// Local images
import slide1Img from '../../assets/images/hero/slide1.png';
import slide2Img from '../../assets/images/hero/slide2.png';
import slide3Img from '../../assets/images/hero/slide3.png';

const slides = [
  {
    tag: 'DROP 04',
    heading: 'URBAN\nSURVIVAL\nGEAR',
    sub: 'Built for the city. Ready for anything.',
    cta: 'SHOP COLLECTION',
    bg: '#1a1a1a',
    accent: '#ff6b35',
    img: slide1Img,
  },
  {
    tag: 'NEW SEASON',
    heading: 'BOLD\nSTYLES.\nBOLDER\nPRICES.',
    sub: 'Up to 40% off selected archive pieces.',
    cta: 'SEE WHAT\'S NEW',
    bg: '#111827',
    accent: '#ffe135',
    img: slide2Img,
  },
  {
    tag: 'LIMITED DROP',
    heading: 'MOVE\nFAST.\nGRAB\nYOURS.',
    sub: 'Exclusive drops. Uncompromising aesthetic.',
    cta: 'EXPLORE DROPS',
    bg: '#0f0f0f',
    accent: '#2bbd7e',
    img: slide3Img,
  },
];

export default function HeroSlider() {
  return (
    <div className="hero-slider-wrap">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation={{ nextEl: '.hero-next', prevEl: '.hero-prev' }}
        pagination={{ clickable: true, el: '.hero-dots' }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="hero-slide" style={{ background: slide.bg }}>
              {/* Left: Text */}
              <div className="hero-content">
                <span className="hero-tag" style={{ background: slide.accent }}>
                  {slide.tag}
                </span>
                <h2 className="hero-heading" style={{ color: '#fff' }}>
                  {slide.heading.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </h2>
                <p className="hero-sub">{slide.sub}</p>
                <Link to="/" className="hero-cta" style={{ background: slide.accent }}>
                  {slide.cta} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

              {/* Right: Image */}
              <div className="hero-img-wrap">
                <img src={slide.img} alt={slide.tag} className="hero-img" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav arrows */}
      <button className="hero-prev"><i className="fas fa-chevron-left"></i></button>
      <button className="hero-next"><i className="fas fa-chevron-right"></i></button>

      {/* Pagination dots */}
      <div className="hero-dots"></div>
    </div>
  );
}
