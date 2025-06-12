"use client";

import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { useTotalQuantity } from "../TotalQuantityProvider";
import CloseIcon from "@mui/icons-material/Close";
import LoginPage from "../../../components/common/LoginPage";
import ForgotPassword from "../../../components/common/ForgotPassword";
import DehazeTwoToneIcon from "@mui/icons-material/DehazeTwoTone";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const { totalQuantity } = useTotalQuantity();

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setForgotPasswordOpen(false);
  };
  const handleLoginClose = () => setLoginOpen(false);
  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
    setLoginOpen(false);
  };
  const handleForgotPasswordClose = () => setForgotPasswordOpen(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleTrackOrderClick = () => {
    router.push("/track-order");
  };

  const handleViewOrder = () => {
    router.push("/details");
  };

  const handleCartOpen = () => {
    router.push("/add-cart");
  };
  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeClick = () => {
    router.push("/"); // change this path based on your route
  };

  const DrawerList = (
    <Box
      sx={{
        width: 300,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "auto",
        p: 2,
        "@media (max-width: 1050px)": {
          height: "50vh",
        },
        "@media (max-width: 639px)": {
          p: 0,
          width: 180,
          height: "100%",
          fontSize: "12px",
        },
      }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          p: 2,
        }}
      >
        <CloseIcon
          sx={{
            cursor: "pointer",
            "@media (max-width: 639px)": {
              height: "20px",
              width: "20px",
            },
          }}
          onClick={toggleDrawer(false)}
        />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            Return Your Order
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            Store Locator
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleViewOrder}>
            View Order
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{ display: "flex", gap: "10px" }}
            onClick={handleLoginOpen}
          >
            <img
              src="/images/profiletoggle.svg"
              alt="Profile"
              width={20}
              height={20}
              className="sm:w-4 sm:h-4.5"
            />
            Log In
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <LoginPage
          open={loginOpen}
          handleClose={handleLoginClose}
          handleRegisterOpen={handleForgotPasswordOpen}
        />
        <ForgotPassword
          open={forgotPasswordOpen}
          handleClose={handleForgotPasswordClose}
        />
      </List>
    </Box>
  );

  return (
    <div className="bg-gray-100 p-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <img
        src="/images/commerce-logo.png"
        alt="Logo"
        className="w-[50px] h-[50px]"
      />

      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-4">
        <input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="text-gray-500" fontSize="small" />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6 text-gray-600">
        <HomeIcon
          className="hover:text-emerald-600 cursor-pointer"
          onClick={handleHomeClick}
        />
        <button onClick={handleCartOpen}>
        <Badge badgeContent={totalQuantity} color="error" >
          <ShoppingCartIcon className="hover:text-emerald-600 cursor-pointer" />
        </Badge>
        </button>
        <div>
          <AccountCircleIcon
            className="hover:text-emerald-600 cursor-pointer"
            onClick={handleLoginOpen}
          />
        </div>
        <div>
          <Button onClick={toggleDrawer(true)}>
            <DehazeTwoToneIcon className="hover:text-emerald-600 cursor-pointer text-gray-600" />
          </Button>
          <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                height: "100vh",
                "@media (max-width: 1090px)": {
                  height: "50vh",
                },
              },
            }}
          >
            {DrawerList}
          </Drawer>
        </div>
      </div>
      <LoginPage
        open={loginOpen}
        handleClose={handleLoginClose}
        handleRegisterOpen={handleForgotPasswordOpen}
      />
      <ForgotPassword
        open={forgotPasswordOpen}
        handleClose={handleForgotPasswordClose}
      />
    </div>
  );
};

export default Header;
