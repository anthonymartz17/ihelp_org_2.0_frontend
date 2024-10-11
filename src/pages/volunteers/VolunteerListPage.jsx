import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function VolunteerListPage() {
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/volunteers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to fetch volunteers: ${response.status} ${errorData.message}`
          );
        }

        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error.message);
      }
    };

    fetchVolunteers();
  }, []);

  const confirmDelete = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/volunteers/${itemToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVolunteers(
        volunteers.filter((volunteer) => volunteer.id !== itemToDelete)
      );
    } catch (error) {
      console.error("Failed to delete volunteer:", error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-3 pl-8">
      <h1 className="roboto-bold text-xl">Volunteers</h1>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 justify-end">
          <form className="w-[25em]">
            <label
              htmlFor="search-volunteer"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                type="search"
                id="search-volunteer"
                className="block w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-500"
                placeholder="Search Volunteers..."
                required
              />
            </div>
          </form>
          <div>
            <button
              onClick={() => navigate("/dashboard/volunteers/new")}
              type="button"
              className="h-full w-56 text-white bg-primary hover:bg-primaryLighter focus:ring-4 focus:outline-none focus:ring-primaryLighter text-l rounded-lg py-2.5 flex justify-center items-center"
            >
              + New Volunteer
            </button>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray">
          <thead className="text-gray-700 bg-gray-50 dark:bg-secondary dark:text-gray-400">
            <tr className="text-white">
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-12 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr
                key={volunteer.id}
                className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
              >
                <td className="px-6 py-4">{volunteer.id}</td>
                <td className="px-6 py-4">{volunteer.name}</td>
                <td className="px-6 py-4">{volunteer.email}</td>
                <td className="px-6 py-4">{volunteer.phone}</td>
                <td className="px-6 py-4">{volunteer.status}</td>
                <td className="px-6 py-4">
                  {new Date(volunteer.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 flex gap-4">
                  <Link to={`/dashboard/volunteers/${volunteer.id}`}>
                    <span className="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
                      visibility
                    </span>
                  </Link>
                  <Link to={`/dashboard/volunteers/${volunteer.id}/edit`}>
                    <span className="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
                      edit
                    </span>
                  </Link>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setItemToDelete(volunteer.id);
                    }}
                    className="material-symbols-outlined cursor-pointer hover:text-red-500 "
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ConfirmationModal
          message={"Are you sure you want to delete this volunteer?"}
          onCancel={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
