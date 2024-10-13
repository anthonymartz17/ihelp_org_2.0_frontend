import React, { useState, useEffect } from "react";

export default function RequestForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    requester: "" || initialData.requester,
    category: "" || initialData.category,
    description: "" || initialData.description,
    date: "" || initialData.date,
    points: "" || initialData.points,
    task: "" || initialData.task,
  });
  const [requesters, setRequesters] = useState([]);

  const categories = [
    "Errands",
    "Cleaning",
    "Various",
    "Technology",
    "Pet Care",
    "Meal Prep",
  ];

  useEffect(() => {
    const fetchRequesters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requesters`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch requesters: ${response.status} ${errorData.message}`
          );
        }

        const data = await response.json();
        setRequesters(data);
      } catch (error) {
        console.error("Error fetching requesters:", error.message);
      }
    };

    fetchRequesters();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <form>
        <div className="flex flex-row gap-4">
          <div className="border border-gray-500 rounded-lg p-2">
            <div className="flex items-center gap-1">
              <select className="border border-gray-500 rounded-md p-[5px_10px] w-[50%]">
                <option selected disabled value="">
                  Requester
                </option>
                {requesters.map((requester) => (
                  <option key={requester.id} value={requester.id}>
                    {requester.first_name} {requester.last_name}
                  </option>
                ))}
              </select>
              <select className="border border-gray-500 rounded-md p-[5px_10px] w-[50%]">
                <option selected disabled value="">
                  Category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <textarea type="text" placeholder="Description"></textarea>
              <input type="date" placeholder="Due Date" />
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-2">
            <div>
              <input type="text" placeholder="Task" />
              <input type="number" placeholder="Points" />
              <button>Add</button>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-[100%]">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
