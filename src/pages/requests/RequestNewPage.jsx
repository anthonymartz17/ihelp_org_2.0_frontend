import React from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../../components/forms/RequestForm";

export default function NewRequestPage() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        throw new Error(
          `Failed to create request: ${response.status} ${errorData.message}`
        );
      }

      alert("Request created successfully!");
    } catch (error) {
      console.error("Error creating request:", error.message);
      alert("Failed to create request.");
    }
  };

  return (
    <div>
      <h1 className="ml-4 text-[18px] font-bold mb-4">New Request</h1>
      <RequestForm onSubmit={handleSubmit} />
    </div>
  );
}
