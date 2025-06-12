import React from 'react';

interface AboutUsCardType {
  title: string;
  description1: string;
  description2: string;
  image: string;
  imageOnLeft?: boolean;
}
const PerfumeCards = ({
  title,
  description1,
  description2,
  image,
  imageOnLeft = false,
}: AboutUsCardType) => {
  return (
    <div
      className={` flex  items-center justify-between sm:flex-col ${
        imageOnLeft ? 'flex-row-reverse ' : 'flex-row '
      }`}
    >
        <img src={image} alt="image" className='w-[600px] h-[600px] md:w-[450px] md:h-[450px] ' />
      <div className="flex flex-col gap-6 ">
        <div className="text-[#555555] text-[45px] font-bold font-dmSans sm:text-[20px]">{title}</div>
        <div className="text-[#808080] font-medium text-[20px] font-dmSans sm:text-[12px]">{description1}</div>
        <div className="text-[#808080] font-medium text-[20px] font-dmSans sm:text-[12px]">{description2}</div>
        <div>
          <button className="bg-[#989898] text-[#FFFFFF] rounded-md w-[170px] h-[50px] hover:bg-[#808080] transition-colors duration-300 sm:text-[10px] sm:w-24 sm:h-7 sm:rounded-[3px] sm:mt-6">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCards;
