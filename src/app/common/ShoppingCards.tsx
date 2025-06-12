"use client ";
import React from "react";
import { useTotalQuantity } from "../TotalQuantityProvider";
interface ShoppingCardsProps {
  id: number;
  title: string;
  unit: string;
  imageUrl: string;
  price: string;
  cancelprice?: string;
  onClick?: any;
}

const ShoppingCards: React.FC<ShoppingCardsProps> = ({
  id,
  title,
  unit,
  imageUrl,
  price,
  cancelprice,
  onClick,
}) => {
  const { addToCart } = useTotalQuantity();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image: imageUrl,
      price: Number(price),
      cancelPrice: cancelprice ? Number(cancelprice) : undefined,
      quantity: 1,
    });
  };
  return (
    <div
      onClick={onClick}
      className="w-auto  flex-wrap  p-[1px] shadow-md shadow-gray-700 bg-gradient-to-t from-[black] to-[#FFFFFF]"
    >
      <div className="bg-white p-5">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-[10px] rounded-br-[50px]  cursor-pointer"
          onClick={onClick} // Now the onClick is directly on the image
        />
        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-[18px] font-sans font-bold text-[#989898] ">
            {title}
          </h3>
          <p className="text-[18px] font-sans font-bold text-[#989898] ">
            {unit}
          </p>
        </div>
        <div className="flex items-center gap-3 sm:!gap-1.5">
          <p className="text-[18px] font-bold text-black font-sans ">{price}</p>
          {cancelprice && (
            <p className="text-gray-400 line-through text-[12px] font-normal ">
              {cancelprice}
            </p>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="py-1 mt-2 px-4 border-[#989898] border-[2px] w-full  rounded-br-[50px] "
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingCards;
