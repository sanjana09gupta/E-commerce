"use client";
import { useEffect, useRef, useState } from "react";
import data from "./data.json";
import ShoppingCards from "../common/ShoppingCards";
import Slider from "react-slick";
import "../styles/slider.css";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 2,
    prevArrow: (
      <img
        src="images/sliderbtn.svg"
        alt="back btn"
        width={48}
        height={48}
        className="sm:w-3 sm:h-3"
      />
    ),
    nextArrow: (
      <img src="images/sliderbtn1.svg" alt="back btn" width={48} height={48} />
    ),
    draggable: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);
  const [scrollDirection, setScrollDirection] = useState(1);
  const scrollSpeed = 4;
  const repeatedData = Array(5).fill(data).flat();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollContainer && isScrolling) {
        scrollContainer.scrollLeft += scrollSpeed * scrollDirection;

        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          setScrollDirection(-1);
        } else if (scrollContainer.scrollLeft <= 0) {
          setScrollDirection(1);
        }

        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling, scrollDirection]);

  const handleUserScroll = () => {
    setIsScrolling(true);
    setTimeout(() => setIsScrolling(true), 100);
  };
  return (
    <>
      <div className="relative bg-[url('/images/background.svg')] bg-cover bg-center h-screen w-full">
        {/* Overlay content centered */}
        <div className="absolute inset-0 flex items-center w-full justify-center">
          <div className="bg-white bg-opacity-80 px-8 py-6  text-center w-full">
            <h1 className="text-4xl font-bold text-emerald-800">
              Welcome to Grocery Store
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-10 mb-10">
        <div
          ref={scrollRef}
          className="flex gap-10 px-10 py-5 mx-[20px] h-[600px] overflow-x-hidden whitespace-nowrap scroll-smooth"
          onScroll={handleUserScroll}
        >
          {repeatedData.map((item) => (
            <div
              key={item.id + Math.random()}
              className={`flex justify-center ${
                item.id % 2 === 0 ? "items-end" : "items-start"
              }`}
            >
              <div className="w-[300px]">
                <ShoppingCards
                  id={item.id}
                  title={item.title}
                  unit={item.unit}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  cancelprice={item.cancelprice}
                  // onClick={() => router.push(`/items-details/${item.id}`)} // Routing when clicking on image
                  onClick={() => router.push(`/items-details/${item.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center py-[30px]">
          <button
            onClick={() => router.push("/more-grocery")}
            className="bg-[#989898] text-[#FFFFFF] rounded-md w-[170px] h-[50px] hover:bg-[#808080] transition-colors duration-300 sm:text-[10px] sm:w-24 sm:h-7 sm:rounded-[3px]"
          >
            Show More
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
