import React, { useState, useEffect } from "react";

export default function RequesterForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    phone: initialData.phone || "",
    addressOne: initialData.addressOne || "",
    addressTwo: initialData.addressTwo || "",
    city: initialData.city || "",
    state: initialData.state || "",
    zip: initialData.zip || "",
  });

  const states = [
    { value: "AL", name: "Alabama" },
    { value: "AK", name: "Alaska" },
    { value: "AZ", name: "Arizona" },
    { value: "AR", name: "Arkansas" },
    { value: "CA", name: "California" },
    { value: "CO", name: "Colorado" },
    { value: "CT", name: "Connecticut" },
    { value: "DE", name: "Delaware" },
    { value: "DC", name: "District Of Columbia" },
    { value: "FL", name: "Florida" },
    { value: "GA", name: "Georgia" },
    { value: "HI", name: "Hawaii" },
    { value: "ID", name: "Idaho" },
    { value: "IL", name: "Illinois" },
    { value: "IN", name: "Indiana" },
    { value: "IA", name: "Iowa" },
    { value: "KS", name: "Kansas" },
    { value: "KY", name: "Kentucky" },
    { value: "LA", name: "Louisiana" },
    { value: "ME", name: "Maine" },
    { value: "MD", name: "Maryland" },
    { value: "MA", name: "Massachusetts" },
    { value: "MI", name: "Michigan" },
    { value: "MN", name: "Minnesota" },
    { value: "MS", name: "Mississippi" },
    { value: "MO", name: "Missouri" },
    { value: "MT", name: "Montana" },
    { value: "NE", name: "Nebraska" },
    { value: "NV", name: "Nevada" },
    { value: "NH", name: "New Hampshire" },
    { value: "NJ", name: "New Jersey" },
    { value: "NM", name: "New Mexico" },
    { value: "NY", name: "New York" },
    { value: "NC", name: "North Carolina" },
    { value: "ND", name: "North Dakota" },
    { value: "OH", name: "Ohio" },
    { value: "OK", name: "Oklahoma" },
    { value: "OR", name: "Oregon" },
    { value: "PA", name: "Pennsylvania" },
    { value: "RI", name: "Rhode Island" },
    { value: "SC", name: "South Carolina" },
    { value: "SD", name: "South Dakota" },
    { value: "TN", name: "Tennessee" },
    { value: "TX", name: "Texas" },
    { value: "UT", name: "Utah" },
    { value: "VT", name: "Vermont" },
    { value: "VA", name: "Virginia" },
    { value: "WA", name: "Washington" },
    { value: "WV", name: "West Virginia" },
    { value: "WI", name: "Wisconsin" },
    { value: "WY", name: "Wyoming" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[12px] p-[20px] w-[50%]"
      >
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <label className="flex flex-col mb-[2%]" htmlFor="firstName">
            First Name:
            <input
              className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col mb-[2%]" htmlFor="lastName">
            Last Name:
            <input
              className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="flex flex-col mb-[2%]" htmlFor="phone">
          Phone:
          <input
            className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(434) 488-8899"
          />
        </label>

        <label className="flex flex-col mb-[2%]" htmlFor="addressOne">
          Street Address:
          <input
            className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
            type="text"
            id="addressOne"
            name="addressOne"
            value={formData.addressOne}
            onChange={handleChange}
          />
        </label>
        <label className="flex flex-col mb-[2%]" htmlFor="addressTwo">
          Apt/Suite:
          <input
            className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
            type="text"
            id="addressTwo"
            name="addressTwo"
            value={formData.addressTwo}
            onChange={handleChange}
          />
        </label>

        <div className="grid grid-cols-[1fr_1fr_1fr] gap-4">
          <label className="flex flex-col mb-[2%]" htmlFor="city">
            City:
            <input
              className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col mb-[2%]" htmlFor="state">
            State:
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[4px]"
            >
              <option value="" disabled>
                onChange={handleChange}
                Select
              </option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  onChange={handleChange}
                  {state.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col mb-[2%]" htmlFor="zip">
            Zip Code:
            <input
              className="border border-[1px] border-[#C5C3C6] rounded pl-[5px] py-[2px]"
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-end mt-[2%]">
          <input
            className="bg-[#289dbc] rounded px-[40px] py-[5px] text-white roboto-bold"
            type="submit"
            value="Submit"
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
