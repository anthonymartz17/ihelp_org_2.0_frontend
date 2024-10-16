import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConformationModal from "../../components/ConfirmationModal";

export default function RequesterListPage() {
  const navigate = useNavigate();
  const [requesters, setRequesters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const confirmDelete = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/requesters/${itemToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setRequesters(
        requesters.filter((requester) => requester.id !== itemToDelete)
      );
    } catch (error) {
      console.error("Failed to delete requester:", error);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-[4em] px-6">
      <h1 className="roboto-bold text-xl">Requesters</h1>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2 justify-end">
            <form className="w-[25em]">
              <label
                htmlFor="default-search"
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
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
              </div>
            </form>
            <div>
              <button
                onClick={() => navigate("/dashboard/requesters/new")}
                type="button"
                className=" h-full w-56 text-white bg-primary hover:bg-primaryLighter focus:ring-4 focus:outline-none focus:ring-primaryLighter text-l rounded-lg py-2.5 flex justify-center items-center"
              >
                + New Requester
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
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {requesters.map((requester) => (
                <tr
                  key={requester.id}
                  className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
                >
                  <td className="px-6 py-4">{requester.id}</td>
                  <td className="px-6 py-4">
                    {requester.first_name} {requester.last_name}
                  </td>
                  <td className="px-6 py-4">{requester.phone}</td>
                  <td className="px-6 py-4">
                    {new Date(requester.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {requester.is_active ? "Active" : "Inactive"}
                  </td>
                  <td className="px-6 py-4 flex gap-4">
                    <Link to={`/dashboard/requesters/${requester.id}`}>
                      <span className="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
                        visibility
                      </span>
                    </Link>
                    <Link to={`/dashboard/requesters/${requester.id}/edit`}>
                      <span className="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
                        edit
                      </span>
                    </Link>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setItemToDelete(requester.id);
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
          <ConformationModal
            message={"Are you sure you want to delete this request?"}
            onCancel={() => setShowModal(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </div>
  );
}
