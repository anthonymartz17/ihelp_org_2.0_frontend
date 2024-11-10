import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RequestForm from "../../components/forms/RequestForm";

export default function EditRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch request: ${response.status} ${errorData.message}`
          );
        }

        const data = await response.json();
        setInitialData({
          requester: data.requester_id,
          category: data.category_id,
          description: data.description,
          due_date: data.due_date,
          tasks: data.tasks.map((task) => ({
            task: task.description,
            point_earnings: task.point_earnings,
          })),
          hours_needed: data.hours_needed,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching request:", error.message);
      }
    };

    fetchRequest();
  }, [id]);

  const handleSubmit = async (formData) => {
    const updatedData = {
      requester: formData.requester,
      category: formData.category,
      description: formData.description,
      due_date: formData.due_date,
      hours_needed: formData.hours_needed,
      tasks: formData.tasks.map((task) => ({
        task: task.task,
        point_earnings: task.point_earnings,
      })),
    };

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
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Failed to update request: ${response.status} ${errorData.message}`
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating request:", error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="ml-4 text-[18px] font-bold mb-4">Edit Request</h1>
      <RequestForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
