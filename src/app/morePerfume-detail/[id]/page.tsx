'use client';

import Review from '@/app/review/Review';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveIcon from '@mui/icons-material/Remove';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import data from '@/app/morePerfume-detail/[id]/data.json';


const quality = [   
  { id: 1, name: 'Non-Alcoholic' },
  { id: 2, name: 'Unisex' },
  { id: 3, name: 'Roll-On' },
  { id: 4, name: 'Best For Gifting' },
  { id: 5, name: 'Top Bestseller' },
];

type Item = {
  id: number;
  title: string;
  unit: string;
  price: string; // Assuming your JSON has price as a string
  cancelprice?: string; // Same for cancelprice if it's a string in JSON
  imageUrl: string;
};

const ItemsDetails = ({ params }: { params: { id: string } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage the menu state
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const addToCartButtonRef = useRef<HTMLButtonElement>(null);

  const [itemData, setItemData] = useState<Item | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const snackbarStyle: React.CSSProperties = {
    position: 'fixed',
    width: '99%',

    // bottom: '20px',
    // left: '50%',
    // transform: 'translateX(-50%)',
    // backgroundColor: '#323232',
    // color: '#fff',
    // padding: '10px 20px',
    borderRadius: '0',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Ensure it's on top of other elements
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenu1 = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    console.log(isSnackbarVisible, 'isSnackbarVisible');
    if (addToCartButtonRef.current) {
      const buttonPosition = addToCartButtonRef.current.getBoundingClientRect();

      console.log(buttonPosition, 'buttonPosition');
      if (buttonPosition.top < 0) {
        setSnackbarVisible(true);
      } else {
        setSnackbarVisible(false);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      const item = (data as Item[]).find(item => item.id === parseInt(params.id));
      setItemData(item || null);
    }
  }, [params.id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  // if (!params.id || isNaN(Number(params.id))) return <p>Invalid item ID</p>;
  if (!itemData) return <p>Item not found</p>;

  return (
    <div className="bg-[#EBEBEB]">
      <div className="flex gap-1 p-8 items-center font-extralight text-[20px] font-dmSans sm:p-6 sm:text-[15px] ">
        <Link href="/" className="text-[#5C5C5C]">
          Home /
        </Link>
        <p>The Story Perfume Spray 100 ML</p>
      </div>
      <div className="flex items-start justify-around  sm:flex-col md:gap-2 md:py-2 ">
        <div className="flex justify-between gap-10 items-start sm:gap-3 md:gap-2">
          <div className="flex flex-col gap-10 px-6 items-center md:px-4 sm:px-2 sm:gap-3 md:gap-8  ">
            <img src="/images/perfumetype1.svg" alt="Perfume Type 1" />
            <img src="/images/perfumetype2.svg" alt="Perfume Type 2" />
            <img src="/images/perfumetype3.svg" alt="Perfume Type 3" />
          </div>
          <div className="md:w-[390px] md:h-[390px] sm:w-[350px] sm:h-[350px] sm:px-2">
            <img src="/images/perfumetype.svg" alt="Perfume Type Main" />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-5 sm:gap-3 sm:px-4">
          <div className="mb-6">
            <p className="font-bold font-dmSans text-[35px] text-[#000000] md:text-[25px] sm:text-[25px]">
              {itemData.title}
            </p>
            <p className="font-bold font-dmSans text-[35px] text-[#000000] md:text-[25px] sm:text-[25px]">
              {itemData.unit}
            </p>
            <div className="flex items-center gap-2">
              <Stack spacing={1}>
                <Rating
                  name="half-rating-read"
                  defaultValue={5}
                  readOnly
                  sx={{ color: '#8A8A8A' }}
                />
              </Stack>

              <div className="flex items-center gap-1 text-[#666666] font-bold text-[12px]">
                <p>(5.0 Rating</p>
                <span>|</span>
                <p>5 Reviews)</p>
              </div>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-[18px] font-bold text-black font-sans">{itemData.price}</p>
              <p className="text-gray-400 line-through text-[12px] font-normal">
                {itemData.cancelprice}
              </p>
              <div className="bg-[#D6D6D6] w-[55px] h-[16px] text-[10px] font-medium font-dmSans rounded-md text-center">
                Save 50%
              </div>
            </div>
          </div>

          <div className="flex gap-2 ">
            {quality.map(item => (
              <div key={item.id} className="bg-white rounded-2xl h-6 px-3 py-1   ">
                <p className="text-[#666666] text-center text-[10px] md:text-[7px] md:text-center">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-normal text-[18px] font-dmSans">Quantity</p>
            <div className="border-[#747474] border-[1px] rounded-[5px] flex items-center w-[20%] justify-between px-1 py-2 md:w-[18%] md:py-1">
              <RemoveIcon className="text-[#4A4A4A] w-4" />
              <p>1</p>
              <AddIcon className="text-[#4A4A4A] w-4" />
            </div>
            <p className="font-normal text-[14px] font-dmSans">
              Click & get upto 25% off using POPcoins
            </p>
          </div>
          <button
            ref={addToCartButtonRef}
            id="addtocart"
            className="w-full h-[55px] bg-[#000000] text-white rounded-[8px] "
          >
            ADD TO CART
          </button>

          <div className="bg-[#C4C4C4] rounded-[8px] w-full h-[40px] text-white flex items-center px-4 md:h-auto md:flex-col md:py-4 ">
            <p className="text-[15px] font-medium">₹100 off on All UPI Payments</p>
          </div>
          <div className="flex items-center justify-around bg-[#C4C4C4] rounded-[8px] w-full h-[70px] md:py-4 md:space-y-3 sm:space-y-2">
            <div className="flex gap-2 md:gap-1 md:w-auto sm:gap-0  ">
              <img src="/images/returns.svg" alt="" className="md:h-[25px] md:w-[25px]" />
              <p className="text-[16px] font-medium font-dmSans md:text-[13px] md:font-small sm:font-small sm:text-[12px] ">
                Easy Returns
              </p>
            </div>
            <span>
              <img src="/images/verticleline.svg" alt="" className="" />
            </span>
            <div className="flex gap-4 w-[25%] md:gap-1 md:w-auto sm:gap-0 ">
              <img src="/images/cod.svg" alt="" className="md:h-[25px] md:w-[25px]" />
              <p className="text-[16px] font-medium font-dmSans md:text-[13px] md:font-small sm:font-small   ">
                COD Available
              </p>
            </div>
            <span>
              <img src="/images/verticleline.svg" alt="" />
            </span>
            <div className="flex gap-2 w-[22%] md:gap-1  md:w-auto">
              <img src="/images/delivery.svg" alt="" className="md:h-[25px] md:w-[25px]" />
              <p className="text-[16px] font-medium font-dmSans md:text-[13px] md:font-small     ">
                Delivery in 4-5 days
              </p>
            </div>
          </div>
          <div
            className="bg-[#C4C4C4] rounded-[8px] w-full h-[40px] flex items-center px-4 "
            onClick={toggleMenu}
          >
            <div className="flex justify-between w-full">
              <p>Available Offers</p>
              <div className="flex items-center">
                <div className="h-[20px] w-[38px] flex items-center justify-around rounded-[3px] bg-[#727272] md:h-[18px]">
                  <img src="/images/tag.svg" alt="" />
                  <p className="text-white">3</p>
                </div>
                {isMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </div>
            </div>
          </div>
          <div
            className={`transition-all duration-1000 ease-in-out ${
              isMenuOpen ? 'max-h-[400px]' : 'max-h-0'
            } overflow-hidden w-full flex flex-col gap-2`}
          >
            <div className="bg-[#C4C4C4] w-full p-4 rounded-lg flex justify-between ">
              <div className="">
                <p className="font-bold text-[15px] font-dmSans">Avail 5% OFF</p>
                <p>
                  Buy 1 product and get <b>5% OFF</b>
                </p>
              </div>
              <div className="border-dashed border-[1px] rounded-[5px] border-white bg-[#B2B2B2] p-2 md:p-1 ">
                <p className="text-[14px] text-white">SAVE5</p>
                <hr className="bg-white h-[1px]" />
                <p className="text-[14px] text-white">COPY</p>
              </div>
            </div>
            <div className="bg-[#C4C4C4] w-full p-4 rounded-lg flex justify-between ">
              <div className="">
                <p className="font-bold text-[15px] font-dmSans">Avail 10% OFF</p>
                <p>
                  Buy 2 product and get <b>10% OFF</b>
                </p>
              </div>
              <div className="border-dashed border-[1px] rounded-[5px] border-white bg-[#B2B2B2] p-2 md:p-1 ">
                <p className="text-[14px] text-white">SAVE10</p>
                <hr className="bg-white h-[1px]" />
                <p className="text-[14px] text-white">COPY</p>
              </div>
            </div>
            <div className="bg-[#C4C4C4] w-full p-4 mb-5 rounded-lg flex justify-between ">
              <div className="">
                <p className="font-bold text-[15px] font-dmSans">Avail 15% OFF</p>
                <p>
                  Buy 3 product and get <b>15% OFF</b>
                </p>
              </div>
              <div className="border-dashed border-[1px] rounded-[5px] border-white bg-[#B2B2B2] p-2 md:p-1 ">
                <p className="text-[14px] text-white">SAVE15</p>
                <hr className="bg-white h-[1px] md:h-o" />
                <p className="text-[14px] text-white">COPY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-20 sm:p-12">
        <h1 className="font-normal text-[50px] font-serifText sm:text-[38rcpx]">Description</h1>
        <div className="font-normal text-[20px] text-[#000000] font-dmSans md:text-[18px] sm:text-[12px]">
          <li>6 Pcs Attar Gift Set Premium Quality Attar Perfume (5.5 Ml Each)</li>
          <li>Shanaya, Leader, White Oudh, Safwan, Oudh Al Hashmi, Lavish Musk</li>
          <li>100% Pure Premium Quality Non-Alcoholic Attar</li>
          <li>Create a real class which will make you distinct amongst many</li>
          <li>
            Made using premium-quality ingredients, this attar is absolutely safe for your skin
          </li>
        </div>
      </div>
      <div className="border-y-2 border-white p-3 mx-10 sm:mx-5 ">
        <div className="items-center justify-around grid grid-cols-6">
          <h1 className="font-dmSans font-bold text-[30px] grid col-span-4 text-end pr-[40px] sm:text-[20px] sm:pr-[10px]">
            Additional Information
          </h1>
          <div className="cursor-pointer col-span-2 text-end">
            {isOpen ? (
              <KeyboardArrowUpIcon onClick={toggleMenu1} className="text-[40px] sm:text-[30px] " />
            ) : (
              <KeyboardArrowDownIcon onClick={toggleMenu1} className="text-[40px] sm:text-[30px]" />
            )}
          </div>
        </div>

        <div
          className={`transition-all duration-1000 ease-in-out overflow-hidden w-full flex flex-col gap-2 ${
            isOpen ? 'max-h-[400px]' : 'max-h-0'
          }`}
        >
          {isOpen && (
            <div className="flex pt-10 sm:pt-7">
              <div className="flex flex-col gap-4 sm:gap-4">
                <div>
                  <p className="font-dmSans font-semibold text-[20px] sm:text-[18px]">PRICE</p>
                  <p className="font-normal text-[12px] ">
                    MRP <b>₹1,499</b> inclusive of all taxes
                  </p>
                </div>
                <div>
                  <p className="font-dmSans font-semibold text-[20px] sm:text-[18px]">PACKED BY</p>
                  <p className="font-normal text-[12px] ">
                    AdilQadri E-commerce Pvt. ltd, Gram Panchayat Talod, 0, 353+354/PAIKI 8, Talodh,
                    Navsari, Gujarat - 396321
                  </p>
                </div>
                <div>
                  <p className="font-dmSans font-semibold text-[20px] sm:text-[18px]">
                    COUNTRY OF ORIGIN
                  </p>
                  <p className="font-normal text-[12px] ">India</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-dmSans font-semibold text-[20px] sm:text-[18px]">
                    BEST BEFORE
                  </p>
                  <p className="font-normal text-[12px] ">24 Months</p>
                </div>
                <div>
                  <p className="font-dmSans font-semibold text-[20px] sm:text-[18px]">
                    MARKETED BY
                  </p>
                  <p className="font-normal text-[12px] ">
                    AdilQadri E-commerce Pvt. ltd, Gram Panchayat Talod, 0, 353+354/PAIKI 8, Talodh,
                    Navsari, Gujarat - 396321
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-[#F6F6F6] w-full mt-[50px] sm:mt-[40px] sm:px-4  md:mt-[45px]">
        <Review />
      </div>
      {isSnackbarVisible && (
        <div
          style={snackbarStyle}
          id="scrolldiv"
          className={`border-y-2 border-white p-3 bg-[#CACACA] flex items-center justify-between
            sm:p-1 sm:w-full 
            md:p-1 md:w-full 
            fixed ${window.innerWidth >= 1000 ? 'top-[100px]' : 'bottom-0'}`}
        >
          <div className="flex items-center gap-4 sm:gap-1">
            <img src="/images/scrolldiv.svg" alt="" className=" sm:w-9" />
            <div>
              <p className="font-normal font-dmSans text-[20px] text-[#000000] sm:text-[15px] md:text-[18px]">
                The Story Perfume Spray 100 ML
              </p>
              <div className="flex items-center gap-6 sm:gap-2 md:gap-4">
                <p className="text-[20px] font-bold text-black font-sans sm:text-[15px] md:text-[17px]">
                  Rs. 599
                </p>
                <p className="text-gray-400 line-through text-[14px] font-medium font-small">
                  Rs. 1,199
                </p>
                <div className="bg-[#D6D6D6] w-[48px] h-[16px] text-[10px] font-medium font-dmSans rounded-md text-center sm:w-auto">
                  Save 50%
                </div>
              </div>
            </div>
          </div>
          <button
            id="addtocart"
            className="w-[142px] h-[40px] bg-[#000000] text-white rounded-[8px] sm:w-[120px] sm:text-sm sm:h-[30px] md:top-[0px]"
          >
            ADD TO CART
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemsDetails;
