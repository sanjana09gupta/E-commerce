"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AddressData {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: string;
  province: string;
}

const options = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "BTC", label: "BTC" },
  { value: "JPY", label: "JPY" },
];

const Page = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [data, setData] = useState<AddressData[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [addressCount, setAddressCount] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // Replace with actual item interface if needed
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState<Omit<AddressData, "id">>({
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: "",
    province: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem("userAddresses");
    const orders = localStorage.getItem("filteredItems");

    if (savedAddresses) setData(JSON.parse(savedAddresses));
    if (orders) setFilteredItems(JSON.parse(orders));
  }, []);

  // Save to localStorage on update
  useEffect(() => {
    localStorage.setItem("userAddresses", JSON.stringify(data));
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    if (editingAddressId !== null) {
      const updatedData = data.map((item) =>
        item.id === editingAddressId ? { ...item, ...formData } : item
      );
      setData(updatedData);
      setEditingAddressId(null);
    } else {
      const newAddress: AddressData = {
        id: addressCount,
        ...formData,
      };
      setData((prev) => [...prev, newAddress]);
      setAddressCount((prev) => prev + 1);
    }

    setFormData({
      firstName: "",
      lastName: "",
      company: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      zipCode: "",
      country: "",
      province: "",
    });

    setIsAddingAddress(false);
    setIsSubmitted(true);
    setShowSuccessPopup(true); // ✅ Show popup
  };

  const handleAddAddressClick = () => {
    setSelectedIndex(1);
    setIsAddingAddress(true);
    setIsSubmitted(false);
    setEditingAddressId(null);
  };

  const handleEditClick = (id: number) => {
    const addressToEdit = data.find((item) => item.id === id);
    if (addressToEdit) {
      const { id: _, ...rest } = addressToEdit;
      setFormData(rest);
      setEditingAddressId(id);
      setIsAddingAddress(true);
      setIsSubmitted(false);
      setSelectedIndex(1);
    }
  };

  const handleDeleteClick = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    if (editingAddressId === id) setEditingAddressId(null);
  };

  return (
    <div>
      <TabGroup
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        className="bg-[#EBEBEB]"
      >
        <div className="border-b border-[#636363] py-12">
          <TabList className="flex justify-center gap-20">
            <Tab className="text-[45px] font-medium text-[#6F6F6F] border-b-[3px] border-transparent data-[selected]:text-black data-[selected]:border-black focus:outline-none">
              Orders
            </Tab>
            <Tab className="text-[45px] font-medium text-[#6F6F6F] border-b-[3px] border-transparent data-[selected]:text-black data-[selected]:border-black focus:outline-none">
              Address
            </Tab>
          </TabList>
        </div>

        <TabPanels as={Fragment}>
          {/* --- Orders Tab --- */}
          <TabPanel className="py-20">
            <div className="text-center">
              <p className="text-[45px] font-serifText">Orders</p>
              <p className="bg-black text-white w-5 h-5 rounded-full text-xs flex items-center justify-center mx-auto">
                {filteredItems.length}
              </p>
            </div>

            {filteredItems.length ? (
              <div className="grid grid-cols-3 gap-4 mt-10 px-10">
                {filteredItems.map((item, index) => (
                  <div
                    key={index}
                    className="border border-[#5D5D5D] rounded-md p-4 flex flex-col gap-3"
                  >
                    <h1 className="font-bold">{`Order ${index + 1}`}</h1>
                    <img
                      src={item.image}
                      alt=""
                      className="w-24 h-24 rounded-tl-[15px] rounded-br-[15px]"
                    />
                    <p>{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Order ID: {item.id}</p>
                    <p className="font-bold">Rs. {item.totalPrice}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-10">
                <p className="text-[#525252] text-[26px]">
                  You have not placed any orders yet.
                </p>
                <button className="mt-4 bg-black text-white px-8 py-2 rounded text-xl">
                  Start Shopping
                </button>
              </div>
            )}
          </TabPanel>

          {/* --- Address Tab --- */}
          <TabPanel>
            {!isAddingAddress && !isSubmitted ? (
              <div className="text-center py-20">
                <p className="text-[45px] font-serifText">Address</p>
                <p className="bg-black text-white w-5 h-5 rounded-full text-xs inline-flex items-center justify-center">
                  {data.length}
                </p>
                <p className="text-[#525252] text-[26px] mt-6">
                  You have not saved any addresses yet.
                </p>
                <button
                  onClick={handleAddAddressClick}
                  className="mt-10 border border-[#525252] px-6 py-4 rounded-md text-[26px] text-[#525252] font-bold"
                >
                  + Add a new address
                </button>
              </div>
            ) : !isSubmitted ? (
              <div className="max-w-3xl mx-auto py-10">
                <h2 className="text-[36px] font-serifText mb-4">
                  Add a New Address
                </h2>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  <div className="flex gap-4">
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </div>
                  <TextField
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Address 1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Address 2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                  <div className="flex gap-4">
                    <TextField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Zip Code"
                      name="zipCode"
                      type="number"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </div>
                  <TextField
                    select
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                  >
                    {options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <button
                    type="submit"
                    className="mt-6 bg-black text-white py-3 rounded-md text-lg"
                  >
                    Save Address
                  </button>
                </Box>
              </div>
            ) : (
              <div className="py-20 max-w-6xl mx-auto">
                <p className="text-[45px] text-center font-serifText mb-10">
                  Saved Addresses
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {data.map((item, idx) => (
                    <div
                      key={item.id}
                      className="border border-[#5D5D5D] rounded-md p-4 flex flex-col justify-between"
                    >
                      <div>
                        <p className="font-bold">{`Address ${idx + 1}`}</p>
                        <p>{`${item.firstName} ${item.lastName}`}</p>
                        <p>{item.company}</p>
                        <p>{item.address1}</p>
                        <p>{item.address2}</p>
                        <p>{`${item.city}, ${item.zipCode}, ${item.province}`}</p>
                        <p>{item.country}</p>
                      </div>
                      <div className="flex gap-6 mt-6">
                        <button
                          onClick={() => handleEditClick(item.id)}
                          className="text-sm text-[#767676] hover:text-black hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="text-sm text-[#767676] hover:text-black hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-who bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4 text-green-600">
              Success!
            </h2>
            <p>Address saved successfully.</p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
