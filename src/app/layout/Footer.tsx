"use client";

import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const trustUsCollection = [
    { id: 1, image: "/images/premium.svg", name: "Premium Quality" },
    { id: 2, image: "/images/cruelty.svg", name: "Cruelty Free" },
    { id: 3, image: "/images/long.svg", name: "Long Lasting" },
    { id: 4, image: "/images/variety.svg", name: "Variety of Fragrances" },
    { id: 5, image: "/images/derma.svg", name: "Derma Tested" },
    { id: 6, image: "/images/vegan.svg", name: "100% Vegan" },
  ];

  const serviceCollection = [
    {
      id: 1,
      image: "/images/easy.svg",
      title: "EASY EXCHANGE",
      description: "Exchange product within 7 days of purchase.",
    },
    {
      id: 2,
      image: "/images/customer.svg",
      title: "CUSTOMER SERVICE",
      description:
        "We are available from Monday to Saturday to answer your questions.",
    },
    {
      id: 3,
      image: "/images/secure.svg",
      title: "SECURE PAYMENT",
      description: "Your payment information is processed securely.",
    },
  ];

  const footerData = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "ABOUT US",
      path: "/about-us",
    },
    {
      name: "OUR WORK",
      path: "/our-work",
    },
    {
      name: "CASE STUDIES",
      path: "/case-study",
    },
    {
      name: "CONTACT US",
      path: "/contact-us",
    },
  ];

  const NavLink = ({ name, path }: any) => (
    <span
      className={
        path === pathname
          ? `border-b border-black dark:border-white pb-1  text-black dark:text-white`
          : ` text-black dark:text-white `
      }
      onClick={() => router.push(path)}
    >
      {name}
    </span>
  );

  return (
    <div className="flex flex-col">
      {/* <div className="bg-[#B8B8B8] w-full pt-10 pb-10">
        <h1 className="font-serifText font-normal text-[65px]  text-black text-center">
          Why Trust Us?
        </h1>
        <div className="flex justify-center items-center gap-7">
          {trustUsCollection.map(item => (
            <div
              key={item.id}
              className="bg-white flex flex-col items-center justify-start p-5 py-3 w-[155px] h-[155px] gap-3 rounded-[5px]"
            >
              <img src={item.image} alt={`${item.id}`} className="" />
              <p className="text-center text-[20px]  font-medium text-[#2F2F2F]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div> */}
      <div className="bg-[#EBEBEB]">
        <div className=" w-full pt-10">
          <h1 className="font-serifText font-normal text-[65px] text-black text-center">
            Our Newsletter
          </h1>
          <div className="flex items-center justify-center gap-10 p-10">
            <input
              type="email"
              id="email"
              className=" px-4 py-2 w-[30%] border h-[60px] border-gray-300 rounded-md shadow-sm focus:ring-[#7A7A7A] focus:ring-1 focus:border-[#7A7A7A] focus:outline-none "
              placeholder="Enter your email"
            />
            <button className="text-white bg-black w-[200px] h-[60px] rounded-[5px]">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="footerbackground mt-14">
          <div className="flex justify-evenly items-center  p-10">
            {serviceCollection.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-[20%] gap-3"
              >
                <img src={item.image} alt={`${item.id}`} className="" />
                <p className="text-center font-serifText text-[16px]  font-bold text-[#FFFFFF]">
                  {item.title}
                </p>
                <p className="text-center font-serifText text-[16px] font-bold text-[#FFFFFF]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 p-4 ">
          <div className="flex  gap-10 items-center justify-between">
            <p className="font-bold font-dmSans text-[30px] text-black">
              Groceries
            </p>
            <p className="font-normal font-dmSans text-[24px] text-black ">
              Groceries@123.com
            </p>
          </div>

          <div className="text-[20px] font-normal flex gap-16 mt-4 ">
            {footerData.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </div>
          <div className="flex w-full justify-between items-center ">
            <div className="flex gap-5">
              <img
                src="/images/facebook.svg"
                alt="Facebook"
                width={30}
                height={30}
                className=""
              />
              <img
                src="/images/twitter.svg"
                alt="Twitter"
                width={30}
                height={30}
                className=""
              />
              <img
                src="/images/instagram.svg"
                alt="Instagram"
                width={30}
                height={30}
                className=""
              />
              <img
                src="/images/linkedin.svg"
                alt="LinkedIn"
                width={30}
                height={30}
                className=""
              />
            </div>
            <div className="flex items-center gap-5 justify-end">
              <input
                type="email"
                id="email"
                className=" px-4 py-2 w-[60%] border h-[35px] border-gray-300 rounded-md shadow-sm focus:ring-[#7A7A7A] focus:ring-1 focus:border-[#7A7A7A] focus:outline-none  "
                placeholder=" your email"
              />
              <button>
                <img
                  src="/images/arrowbtn.svg"
                  alt=""
                  width={35}
                  height={35}
                  className=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
