import { Dialog } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const ForgotPassword = ({ open, handleClose }: any) => {
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
      <div className="flex sm:flex-col items-start sm:items-center h-full border-[#696969] rounded-[10px] ">
        <div className="flex h-full items-center  py-4 pl-4 sm:pl-0 sm:py-8">
          <img
            src="images/login-image.svg"
            alt=""
            className="h-full sm:max-h-72 "
          />
        </div>

        <div className="flex flex-col items-center justify-start h-[100%]  w-[60%] sm:w-auto px-14 pt-10 sm:px-0 sm:pt-0">
          <div className="absolute top-0 right-0 p-4 sm:p-2">
            <CancelRoundedIcon onClick={handleClose} />
          </div>

          <img
            src="/images/commerce-logo.png"
            alt="Logo"
            className="w-[50px] h-[50px]"
          />
          <div className="text-[22px] font-semibold text-sm  font-serifText py-5 sm:py-2.5">
            Welcome to Groceries
          </div>
          <p className="text-[#7F7F7F] text-base pt-1 sm:text-[10px]">
            Enter your Registered Email
          </p>
          <input
            type="email"
            placeholder="Emali"
            className="text-black bg-[#EFEFEF] border-[1px] text-base  focus:outline-[#646464]  rounded-[5px] placeholder-black py-2 px-5 w-full mx-6 my-5 sm:my-2.5 sm:text-[10px] sm:px-2.5 sm:py-1"
          />

          <button className="bg-black text-white font-bold text-base rounded-[3px] py-2 my-4 w-[calc(100%-20%)] mt-4 md:text-sm sm:text-[10px] sm:py-1 sm:my-2">
            FORGOT PASSWORD
          </button>

          <div className="flex text-xs gap-10 pt-4 sm:py-3 sm:pt-0 sm:gap-5 sm:text-[8px]">
            <p className="text-[#7F7F7F]">Have an Account?</p>
            <p className="font-bold">Login Now</p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ForgotPassword;
