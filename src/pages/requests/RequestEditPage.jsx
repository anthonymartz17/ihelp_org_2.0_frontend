import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RequestForm from "../../components/forms/RequestForm";

export default function EditRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch request: ${errorData.message}`);
        }

        const data = await response.json();
        setInitialData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching request data:", error.message);
        alert("Failed to load request data. Please try again.");
        navigate("/dashboard");
      }
    };

    fetchRequestData();
  }, [id, navigate]);

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update request: ${errorData.message}`);
      }

      alert("Request updated successfully!");
      navigate("/requests");
    } catch (error) {
      console.error("Error updating request:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="ml-4 text-[18px] font-bold mb-4">Edit Request</h1>
      <RequestForm initialData={initialData} onSubmit={handleFormSubmit} />
    </div>
  );
}
