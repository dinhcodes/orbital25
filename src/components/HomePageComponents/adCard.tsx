import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
  cardBackground: string;
  cardPic: StaticImageData | string;
  altText?: {
    discount?: string;
    title?: string;
    description?: string;
  };
}

const Card: React.FC<CardProps> = ({ cardBackground, cardPic, altText }) => {
  return (
    <div
      className={`${cardBackground} text-white p-6 sm:p-8 rounded-2xl w-full max-w-2xl lg:max-w-3xl mx-auto shadow-lg flex flex-col min-h-[200px] sm:min-h-[250px]`}
    >
      {/* Main content area */}
      <div className="flex-1 flex flex-col sm:flex-row items-center overflow-hidden">
        <div className="flex-1 space-y-2 sm:space-y-3 mb-6 sm:mb-0 sm:mr-6 md:mr-8 text-center sm:text-left">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {altText?.discount}
            <span className="text-xs sm:text-sm align-super relative -top-1.5 sm:-top-2 ml-0.5">*</span>
          </p>
          <h2 className="text-lg sm:text-3xl lg:text-6xl font-bold leading-tight">
            {altText?.title}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base">
            {altText?.description}
          </p>
        </div>

        <div className="flex-shrink-0 w-24 h-24 sm:w-36 sm:h-36 lg:w-52 lg:h-52 relative">
          <Image
            src={cardPic}
            alt={altText?.title || 'Ad image'}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      {/* Dots at bottom - always stays at bottom */}
      <div className="flex items-center justify-center space-x-2 mt-2 md:mt-4 pt-2">
        <span className="w-2 h-2 bg-white/30 rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></span> {/* Active dot, implement carouselll later */} 
        <span className="w-2 h-2 bg-white/30 rounded-full"></span>
      </div>
    </div>
  );
};

export default Card;