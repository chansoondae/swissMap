"use client"
import { useState } from 'react';
import Image from 'next/image';

function CityButton({ city, handleCityClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => handleCityClick(city)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        marginBottom: '10px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '80px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2px',
          background: 'linear-gradient(145deg, #ffffff, #d1cdc7)',
          boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.15), -4px -4px 8px rgba(255, 255, 255, 0.7)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Image 
          src={city.image} 
          alt={city.name} 
          width={60} 
          height={60} 
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--foreground)',
          marginTop: '4px',
          textAlign: 'center',
        }}
      >
        {city.name}
      </span>
    </button>
  );
}

export default CityButton;