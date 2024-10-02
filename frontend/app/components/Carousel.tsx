import React, { useEffect, useRef, useState } from 'react';

interface Item {
  id: number;
  title: string;
  label: string; // Added label property
}

const Carousel: React.FC = () => {
  const items: Item[] = [
    { id: 1, title: "Thesis Title 1", label: "SBIT Department" },
    { id: 2, title: "Thesis Title 2", label: "SLATE Department" },
    { id: 3, title: "Thesis Title 3", label: "SARFAID Department" },
    { id: 4, title: "Thesis Title 4", label: "SHTM Department" },
    { id: 5, title: "Thesis Title 5", label: "Label 5" },
  ];

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth / items.length;
        const newIndex = Math.round(carouselRef.current.scrollLeft / scrollWidth);
        setCurrentIndex(newIndex);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (carouselRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (carouselRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the sensitivity
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative overflow-hidden mt-3.5 ml-1" style={{ top: '495px' }}>
      <h1 className="text-2xl font-bold text-center mb-4 ml-2" style={{ textAlign: 'left' }}>Recommended</h1>
      <div
        ref={carouselRef}
        className="flex whitespace-nowrap py-4 transition-all duration-300"
        style={{ display: 'flex' }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        {items.map(item => (
          <div
            key={item.id}
            className="inline-block mx-2 p-4 h-52 bg-white shadow-md rounded-lg cursor-pointer"
            style={{ minWidth: '193px', textAlign: 'left' }}
          >
            <h2 className="text-xl">{item.title}</h2>
            <span className="text-sm text-gray-500">{item.label}</span> {/* Display label here */}
          </div>
        ))}
      </div>
      <div className="absolute top-0 flex justify-center" style={{ left: '953px' }}>
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => {
              const newScrollLeft = (index + 1) * (carouselRef.current?.scrollWidth || 0) / items.length;
              if (carouselRef.current) {
                carouselRef.current.scrollLeft = newScrollLeft;
              }
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
