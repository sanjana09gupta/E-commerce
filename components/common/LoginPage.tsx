import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useState } from "react";
import { Dialog } from "@mui/material";
import Link from "next/link";

const LoginPage = ({ open, handleClose, handleForgotPassword }: any) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleLogin = () => {
    console.log("Form Data:", formValues);
    localStorage.setItem("userLoginData", JSON.stringify(formValues));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          maxWidth: "900px",
          width: "100%",
        },
      }}
    >
      <div className=" relative flex justify-center items-center h-full border-[#696969] rounded-[10px] ">
        <div className="flex h-full items-center py-4 pl-4">
          <img src="images/login-image.svg" alt="" className="h-full " />
        </div>

        <div className="flex flex-col items-center  h-[100%]  w-[60%] px-14 pt-5">
          <div className="absolute top-0 right-0 p-4">
            <CancelRoundedIcon onClick={handleClose} />
          </div>
          <img
            src="/images/commerce-logo.png"
            alt="Logo"
            className="w-[50px] h-[50px]"
          />
          <div className="text-[22px]  font-serifText py-5">
            Welcome to Groceries
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            className="text-black bg-[#EFEFEF] border-[1px] text-base  focus:outline-[#646464]  rounded-[5px] placeholder-black py-2 px-5 w-full mx-6"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            className="text-black bg-[#EFEFEF]   text-base  focus:outline-[#646464] rounded-[5px] placeholder-[#818181]  py-2 px-5 w-full my-4"
          />
          <div className="flex text-xs py-3 gap-10">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="subscribe"
                name="subscribe"
                className="color-[#7F7F7F]"
              />
              <label htmlFor="subscribe" className="text-[#7F7F7F]">
                Remember Login
              </label>
            </div>
            <p onClick={handleForgotPassword}>Forgot Password ?</p>
          </div>

          <button
            className="bg-black text-white font-bold text-base rounded-[3px] py-2 my-2 w-[calc(100%-20%)] mt-4"
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="flex items-center bg-[#EFEFEF] border border-[#686868] rounded-[3px] p-2 gap-3 my-4 ">
            <img src="images/google.svg" alt="" />
            <p className="text-xs">Login with Google</p>
          </div>
          <div className="flex text-xs gap-10 md:gap-3">
            <p className="text-[#7F7F7F]">You don’t have an account yet?</p>
            <p className="font-bold">Register Now</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginPage;
