import React from 'react';

interface BodySparyCardsProps {
  title: string;

  unit: string;
  imageUrl: string;
  price: string;
  cancelprice?: string;
  onClick?: any;
}

const BodySparyCards: React.FC<BodySparyCardsProps> = ({
  title,
  unit,
  imageUrl,
  price,
  cancelprice,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="w-auto  flex-wrap rounded-br-[50px] rounded-tl-[50px]   p-[1px] shadow-md shadow-gray-700 bg-gradient-to-t from-[black] to-[#FFFFFF]"
    >
      <div className="bg-white p-5 rounded-br-[50px] rounded-tl-[50px] sm:p-3">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-tl-[50px] rounded-br-[50px]  cursor-pointer sm:h-40"
          onClick={onClick} // Now the onClick is directly on the image
        />
        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-[18px] font-sans font-bold text-[#989898] sm:text-[10px]">{title}</h3>
          <p className="text-[18px] font-sans font-bold text-[#989898] sm:text-[10px]">{unit}</p>
        </div>
        <div className="flex items-center gap-3 sm:!gap-1.5">
          <p className="text-[18px] font-bold text-black font-sans sm:text-[10px]">{price}</p>
          {cancelprice && (
            <p className="text-gray-400 line-through text-[12px] font-normal sm:text-[10px]">
              {cancelprice}
            </p>
          )}
        </div>
        <button className="py-1 mt-2 px-4 border-[#989898] border-[2px] w-full  rounded-br-[50px] sm:text-[10px]">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default BodySparyCards;
