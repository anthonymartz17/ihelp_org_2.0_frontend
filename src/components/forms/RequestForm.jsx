import React, { useState, useEffect } from "react";

export default function RequestForm({ initialData = {}, onSubmit }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    requester: initialData.requester || "",
    category: initialData.category || "",
    description: initialData.description || "",
    date: initialData.date || today,
    points: initialData.points || "",
    task: initialData.task || "",
  });

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ task: "", points: "" });
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
            headers: { Authorization: `Bearer ${token}` },
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

  const handleAddTask = () => {
    if (taskInput.task && taskInput.points) {
      setTasks([...tasks, taskInput]);
      setTaskInput({ task: "", points: "" });
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-[100%] p-[5px_20px]">
        <div className="flex gap-4">
          <div className="p-2 w-[50%]">
            <div className="flex items-center gap-7 mb-3">
              <label className="w-[50%]">
                Requester
                <br />
                <select className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] mt-[3%]">
                  <option selected disabled value="">
                    Select
                  </option>
                  {requesters.map((requester) => (
                    <option key={requester.id} value={requester.id}>
                      {requester.first_name} {requester.last_name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="w-[50%]">
                Category
                <br />
                <select className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] mt-[3%]">
                  <option selected disabled value="">
                    Select
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                General Description
                <textarea
                  className="border border-gray-500 rounded-md p-[5px_10px] w-[100%] resize-none overflow-auto"
                  placeholder="Write your description..."
                  style={{ maxHeight: "150px" }}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </label>
              <input
                className="border border-gray-500 rounded-md p-[5px_10px] w-[100%]"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="p-2 w-[50%]">
            <h3>Tasks</h3>
            <div className="border border-gray-500 rounded-lg px-7 py-4 mt-[1%] h-[90%]">
              <div className="grid grid-cols-[6fr_1fr_1fr] gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Describe Task"
                  className="border border-gray-500 rounded-md p-[5px_10px]"
                  value={taskInput.task}
                  onChange={(e) =>
                    setTaskInput({ ...taskInput, task: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Points"
                  className="border border-gray-500 rounded-md p-[5px_10px]"
                  value={taskInput.points}
                  onChange={(e) =>
                    setTaskInput({ ...taskInput, points: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white rounded-md p-[5px_10px]"
                  onClick={handleAddTask}
                >
                  Add
                </button>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                {tasks.map((task, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {task.task} - {task.points} Points
                    </span>
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => handleDeleteTask(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-[100%] mt-[1.5%]">
          <button className="bg-black text-white rounded-lg p-[5px_20px]">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
