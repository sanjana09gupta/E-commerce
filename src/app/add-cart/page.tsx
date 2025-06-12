"use client";

import { Stepper, Step, Typography } from "@material-tailwind/react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTotalQuantity } from "../TotalQuantityProvider";
import data from "./data.json";

type ItemType = {
  id: number;
  title: string;
  price: number;
  cancelprice: number;
  image: string;
};

function Page() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const { cartItems } = useTotalQuantity();
    const [localCartItems, setLocalCartItems] = useState([]);

  const [itemQuantities, setItemQuantities] = useState<{
    [key: number]: number;
  }>({});
  const { setTotalQuantity } = useTotalQuantity();
  const router = useRouter();

  useEffect(() => {
    // const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (Array.isArray(cartItems)) {
      const addedItems = cartItems.map((item) => Number(item.id)); // ensure numbers
      const itemQuantities: { [key: number]: number } = {};
      cartItems.forEach((item) => {
        itemQuantities[item.id] = item.quantity;
      });

      setAddedItems(addedItems);
      setItemQuantities(itemQuantities);
    }
  }, []);

  useEffect(() => {
    const updatedCartItems = addedItems.map((id) => ({
      id,
      quantity: itemQuantities[id] || 0,
    }));
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  }, [addedItems, itemQuantities]);

  useEffect(() => {
    const totalQuantity = getTotalQuantity();
    setTotalQuantity(totalQuantity);
  }, [itemQuantities]);

  const getTotalQuantity = () => {
    const totalQuantity = Object.values(itemQuantities).reduce(
      (total, qty) => total + qty,
      0
    );

    if (totalQuantity === 0) setActiveStep(null);
    else if (totalQuantity === 1) setActiveStep(0);
    else if (totalQuantity === 2) setActiveStep(1);
    else if (totalQuantity >= 3) setActiveStep(2);

    return totalQuantity;
  }

  useEffect(() => {
    // This code only runs in the browser
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setLocalCartItems(JSON.parse(storedItems));
    }
  }, []);

  // Merge unique items from localStorage that are not in the JSON data
  const mergedData = [
    ...data.map((item) => ({
      ...item,
      price: Number(item.price),
      cancelprice: Number(item.cancelprice),
    })),
    ...localCartItems.filter(
      (localItem: any) => !data.find((jsonItem) => jsonItem.id === localItem.id)
    ),
  ];

  const formattedData: ItemType[] = mergedData;

  // const formattedData: ItemType[] = data.map((item) => ({
  //   ...item,
  //   price: Number(item.price),
  //   cancelprice: Number(item.cancelprice),
  // }));

  const handleAddItem = (item: ItemType) => {
    if (!addedItems.includes(item.id)) {
      setAddedItems((prev) => [...prev, item.id]);
      setItemQuantities((prev) => ({ ...prev, [item.id]: 1 }));
    } else {
      setItemQuantities((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1,
      }));
    }
  };

  const handleRemoveItem = (item: ItemType) => {
    setItemQuantities((prev) => {
      const currentQty = prev[item.id] || 0;
      const newQty = Math.max(currentQty - 1, 0);

      if (newQty === 0) {
        setAddedItems((prevItems) => prevItems.filter((id) => id !== item.id));
      }

      return { ...prev, [item.id]: newQty };
    });
  };

  const handleDeleteItem = (item: ItemType) => {
    setAddedItems((prev) => prev.filter((id) => id !== item.id));
    const { [item.id]: _, ...rest } = itemQuantities;
    setItemQuantities(rest);
  };

  const handleViewOrder = () => {
    const filteredData = formattedData
      .filter((item: ItemType) => addedItems.includes(item.id))
      .map((item) => ({
        id: item.id,
        image: item.image,
        title: item.title,
        quantity: itemQuantities[item.id] || 0,
        totalPrice: (itemQuantities[item.id] || 0) * (item.price || 0),
        cancelPrice: item.cancelprice,
      }));

    localStorage.setItem("filteredItems", JSON.stringify(filteredData));
    router.push("/details");
  };

  useEffect(() => {
    const totalQuantity = getTotalQuantity();
    setTotalQuantity(totalQuantity);
  }, [itemQuantities]);

  const totalCost = formattedData
    .filter((item: ItemType) => addedItems.includes(item.id))
    .reduce(
      (sum, item) => sum + (itemQuantities[item.id] || 0) * (item.price || 0),
      0
    );

  const getItemTotal = (id: number, price: number) =>
    (itemQuantities[id] || 0) * (price || 0);

  return (
    <div className="min-h-screen bg-[#EBEBEB]">
      {/* Header */}
      <div className="bg-black text-center py-14">
        <h1 className="text-white font-serifText text-[45px] ">CART</h1>
      </div>

      {/* Main Body */}
      <div className="flex flex-col px-10 gap-8">
        {/* Left Section */}
        <div className="w-2/3 sm:w-full">
          {/* Title with Image */}
          <div className="flex items-center gap-2 justify-center pt-10">
            <img src="/images/addCart.svg" alt="cart" className="" />
            <p className="text-[26px] ">
              {Object.keys(itemQuantities).length} item
            </p>
          </div>

          {/* Discount Message & Stepper */}
          <div className="hide-scrollbar overflow-y-auto max-h-[60vh]mt-4">
           
            {/* Item List */}
            <div className="mt-7 flex flex-col gap-3">
              {formattedData
                .filter((item) => addedItems.includes(item.id))
                .map((item) => (
                  <div key={item.id} className="flex bg-[#F8F8F8] p-4 gap-6">
                    <img src={item.image} alt={item.title} className="w-24" />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between">
                        <p className="text-[26px]">{item.title}</p>
                        <img
                          src="/images/delete.svg"
                          alt="delete"
                          className="cursor-pointer w-5 sm:w-4"
                          onClick={() => handleDeleteItem(item)}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#747474] rounded gap-4 px-2 sm:px-1 sm:gap-2">
                          <RemoveIcon
                            className="cursor-pointer"
                            onClick={() => handleRemoveItem(item)}
                          />
                          <p className="text-lg sm:text-sm">
                            {itemQuantities[item.id]}
                          </p>
                          <AddIcon
                            className="cursor-pointer"
                            onClick={() => handleAddItem(item)}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <p>Rs. {getItemTotal(item.id, item.price)}</p>
                          <del className="text-[#808080] text-xs sm:text-[10px]">
                            {item.cancelprice}
                          </del>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* UPI Offer */}
          <div className="flex items-center justify-between bg-[#999898] mt-10 rounded px-4 py-3 sm:mt-5 sm:px-2">
            <p className="text-white text-[22px] md:text-xl sm:text-sm">
              ₹50 off on All UPI Payments
            </p>
            <div className="flex items-center gap-5 sm:gap-2">
              <img src="/images/gpay.svg" alt="gpay" className="w-16 sm:w-10" />
              <img
                src="/images/paytm.svg"
                alt="paytm"
                className="w-16 sm:w-12"
              />
            </div>
          </div>

          {/* Checkout Button */}
          <div className="flex items-center justify-between mt-6 sm:mt-4">
            <p className="text-[32px] sm:text-[24px] font-bold">
              Rs. {totalCost}
            </p>
            <button
              className="bg-black text-white text-xl rounded px-16 py-3 sm:text-sm sm:px-6 sm:py-2"
              onClick={handleViewOrder}
            >
              CHECKOUT
            </button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/3 sm:w-full">
          <div className="hide-scrollbar shadow-md overflow-y-auto h-[113vh] md:h-[77vh] py-10 sm:py-6 sm:mb-2">
            <p className="text-center text-lg font-bold pb-10 sm:text-sm sm:pb-6">
              ADD ANY 1 AND GET EXTRA 5% OFF
            </p>
            <div className="flex flex-col gap-8 sm:flex-row sm:overflow-x-auto sm:gap-4">
              {formattedData.map((item: ItemType) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-2 sm:min-w-[150px]"
                >
                  <img
                    src={item.image}
                    alt="square"
                    className="w-[120px] h-[120px] sm:w-20 sm:h-20"
                  />
                  <p className="text-center text-base px-4 sm:text-xs">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-1">
                    <p className="font-bold text-base sm:text-xs">
                      Rs. {item.price}
                    </p>
                    <del className="text-[#808080] text-xs sm:text-[10px]">
                      {item.cancelprice}
                    </del>
                  </div>
                  <button
                    className="bg-black text-white text-sm px-6 py-1 rounded sm:text-xs sm:px-4"
                    onClick={() => handleAddItem(item)}
                  >
                    ADD
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
