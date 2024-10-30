import React, { useState } from "react";

export default function BadgesForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requirement: "",
    image: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-md font-bold text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-md font-bold text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-md font-bold text-gray-700"
              htmlFor="requirement"
            >
              Requirement
            </label>
            <input
              type="text"
              name="requirement"
              id="requirement"
              value={formData.requirement}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-md font-bold text-gray-700"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              value={formData.image_url}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:shadow-outline-teal"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
