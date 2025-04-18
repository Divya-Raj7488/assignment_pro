"use client";
import React, { useState } from "react";
import "../style/AddressForm.css";
import { toast } from "react-toastify";

const AddressForm = ({ setRenderId }) => {
  const [address, setAddress] = useState({
    fullName: "",
    contact: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
  });
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const requiredFields = [
      "fullName",
      "contact",
      "address1",
      "city",
      "postalCode",
      "state",
      "country",
    ];
    for (let field of requiredFields) {
      if (!address[field] || address[field].trim() === "") {
        toast.error(`${field} is not defined`);
        return;
      }
    }
    const existing = JSON.parse(localStorage.getItem("addresses")) || [];
    const updatedAddresses = [...existing, address];
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    toast.success("Address saved successfully!");
    setAddress({
      fullName: "",
      contact: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      state: "",
      country: "",
    });
  };

  const handleAddressForm = (e) => {
    const { name, value } = e.target;
    setAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="w-3/5 h-4/5 flex flex-col justify-evenly border px-4 py-2 rounded-md">
        <h1 className="w-full flex justify-center text-2xl font-bold">
          Add Address
        </h1>
        <div className="w-full h-24 flex flex-col justify-between px-2 md:flex-row md:h-10">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressForm}
            className="w-full h-10 border-white rounded-md pl-2 border md:w-2/5 md:h-full"
          />
          <input
            type="text"
            placeholder="Contact Details"
            name="contact"
            value={address.contact}
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setAddress({ ...address, contact: value });
              }
            }}
            className="w-full h-10 border-white rounded-md pl-2 border md:w-2/5 md:h-full"
          />
        </div>
        <div className="w-full h-24 flex flex-col justify-between px-2">
          <input
            type="text"
            placeholder="Address 1"
            name="address1"
            value={address.address1}
            onChange={handleAddressForm}
            className="w-full h-10 border-white rounded-md pl-2 border"
          />
          <input
            type="text"
            placeholder="Address 2"
            name="address2"
            value={address.address2}
            onChange={handleAddressForm}
            className="w-full h-10 border-white rounded-md pl-2 border"
          />
        </div>
        <div className="w-full h-10 flex justify-between px-2 ">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={address.city}
            onChange={handleAddressForm}
            className="w-3/5 h-full border-white rounded-md pl-2 border"
          />
          <input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={address.postalCode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                setAddress({ ...address, postalCode: value });
              }
            }}
            inputMode="numeric"
            className="w-1/5 h-full border-white rounded-md pl-1 border"
          />
        </div>
        <div className="w-full h-10 flex justify-between px-2">
          <input
            type="text"
            placeholder="State"
            name="state"
            value={address.state}
            onChange={handleAddressForm}
            className="w-2/5 h-full border-white rounded-md pl-2 border"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={address.country}
            onChange={handleAddressForm}
            className="w-2/5 h-full border-white rounded-md pl-2 border"
          />
        </div>
        <div className="w-full h-10 flex justify-end pr-2 gap-4">
          <button
            className="w-20 h-10 border rounded-md"
            onClick={() => setRenderId(0)}
          >
            Cancel
          </button>
          <button
            className="w-20 h-10 bg-green-700 border-green-700 rounded-md"
            onClick={handleFormSubmission}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
