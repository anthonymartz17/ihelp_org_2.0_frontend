import React from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../../components/forms/RequestForm";

export default function NewRequestPage() {
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create request: ${errorData.message}`);
      }

      alert("Request created successfully!");
      navigate("/requests");
    } catch (error) {
      console.error("Error creating request:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="ml-4 text-[18px] font-bold mb-4">New Request</h1>
      <RequestForm onSubmit={handleFormSubmit} />
    </div>
  );
}
