"use client";

import ShoppingCards from "@/app/common/ShoppingCards";
import { useRouter } from "next/navigation";
import data from "./data.json";

const perfume = () => {
  const router = useRouter();

  return (
    <div className="bg-[#EBEBEB]">
      <div className="w-full bg-black p-14 ">
        <h1 className="font-normal font-serifText text-[45px] text-center text-white">
          NEW ARRIVAL ITEMS
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-32 p-20">
        {data.map((item: any) => (
          <ShoppingCards
            key={item.id}
            id={item.id}
            title={item.title}
            unit={item.unit}
            imageUrl={item.imageUrl}
            price={item.price}
            cancelprice={item.cancelprice}
            onClick={() => router.push(`/morePerfume-detail/${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default perfume;
