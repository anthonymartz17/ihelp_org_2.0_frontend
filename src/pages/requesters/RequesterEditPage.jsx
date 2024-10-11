import React, { useEffect, useState } from "react";
import RequesterForm from "../../components/forms/RequesterForm.jsx";

export default function RequesterEditPage({ requesterId }) {
  const [requesterData, setRequesterData] = useState(null);

  useEffect(() => {
    const fetchRequesterData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requesters/${requesterId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching requester data");
        }
        const data = await response.json();
        setRequesterData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRequesterData();
  }, [requesterId]);

  const handleUpdate = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/requesters/${requesterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating requester");
      }

      const data = await response.json();
      console.log("Requester updated:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-[24px] font-bold mb-4">Edit Requester</h1>
      {requesterData ? (
        <RequesterForm initialData={requesterData} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
