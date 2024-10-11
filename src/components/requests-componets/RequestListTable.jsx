import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
const requests = [
  {
    id: 1,
    organization_id: 1,
    volunteer_id: 1,
    volunteer_name: "Alice Johnson",
    requester_id: 1,
    requester_name: "Bob Smith",
    status_id: 1,
    status_name: "Open",
    description: "Help with grocery shopping",
    created_at: "2024-10-02T00:57:45.894Z",
    updated_at: "2024-10-02T00:57:45.894Z",
  },
  {
    id: 2,
    organization_id: 2,
    volunteer_id: 2,
    volunteer_name: "John Doe",
    requester_id: 2,
    requester_name: "Jane Doe",
    status_id: 2,
    status_name: "Assigned",
    description: "Assistance with home cleaning",
    created_at: "2024-10-02T00:57:45.894Z",
    updated_at: "2024-10-02T00:57:45.894Z",
  },
  {
    id: 3,
    organization_id: 3,
    volunteer_id: 3,
    volunteer_name: "Emily Davis",
    requester_id: 3,
    requester_name: "Michael Brown",
    status_id: 3,
    status_name: "In Progress",
    description: "Need a ride to the doctor",
    created_at: "2024-10-02T00:57:45.894Z",
    updated_at: "2024-10-02T00:57:45.894Z",
  },
  {
    id: 4,
    organization_id: 4,
    volunteer_id: 4,
    volunteer_name: "Chris Evans",
    requester_id: 4,
    requester_name: "Sarah Connor",
    status_id: 4,
    status_name: "Completed",
    description: "Help moving furniture",
    created_at: "2024-10-02T00:57:45.894Z",
    updated_at: "2024-10-02T00:57:45.894Z",
  },
  {
    id: 5,
    organization_id: 5,
    volunteer_id: 5,
    volunteer_name: "Jessica Adams",
    requester_id: 5,
    requester_name: "Tom Hanks",
    status_id: 3,
    status_name: "In Progress",
    description: "Deliver meals to elderly neighbors",
    created_at: "2024-10-02T00:57:45.894Z",
    updated_at: "2024-10-02T00:57:45.894Z",
  },
  {
    id: 6,
    organization_id: 1,
    volunteer_id: 1,
    volunteer_name: "Alice Johnson",
    requester_id: 1,
    requester_name: "Bob Smith",
    status_id: 1,
    status_name: "Open",
    description: "Help with grocery shopping",
    created_at: "2024-10-04T16:26:26.919Z",
    updated_at: "2024-10-04T16:26:26.919Z",
  },
  {
    id: 7,
    organization_id: 2,
    volunteer_id: 2,
    volunteer_name: "John Doe",
    requester_id: 2,
    requester_name: "Jane Doe",
    status_id: 1,
    status_name: "Open",
    description: "Assistance with home cleaning",
    created_at: "2024-10-04T16:26:26.919Z",
    updated_at: "2024-10-04T16:26:26.919Z",
  },
  {
    id: 8,
    organization_id: 3,
    volunteer_id: 3,
    volunteer_name: "Emily Davis",
    requester_id: 3,
    requester_name: "Michael Brown",
    status_id: 3,
    status_name: "In Progress",
    description: "Need a ride to the doctor",
    created_at: "2024-10-04T16:26:26.919Z",
    updated_at: "2024-10-04T16:26:26.919Z",
  },
  {
    id: 9,
    organization_id: 4,
    volunteer_id: 4,
    volunteer_name: "Chris Evans",
    requester_id: 4,
    requester_name: "Sarah Connor",
    status_id: 4,
    status_name: "Completed",
    description: "Help moving furniture",
    created_at: "2024-10-04T16:26:26.919Z",
    updated_at: "2024-10-04T16:26:26.919Z",
  },
  {
    id: 10,
    organization_id: 5,
    volunteer_id: 5,
    volunteer_name: "Jessica Adams",
    requester_id: 5,
    requester_name: "Tom Hanks",
    status_id: 3,
    status_name: "In Progress",
    description: "Deliver meals to elderly neighbors",
    created_at: "2024-10-04T16:26:26.919Z",
    updated_at: "2024-10-04T16:26:26.919Z",
  },
];

export default function RequestListTable({}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  function tryDelete(id) {
    console.log("delete", id);
    setShowModal((prev) => !prev);
    setItemToDelete(id);
  }
  function cancelDelete() {
    setShowModal((prev) => !prev);
    setItemToDelete(null);
  }

  function confirmDelete() {
    // Perform the actual delete operation here
    setShowModal((prev) => !prev);
    setItemToDelete(null);
  }
  return (
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
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-gray-700 border border-gray-300 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              <span className="material-symbols-outlined">filter_list</span>
              Filter by
            </button>

            <div
              id="dropdown"
              className="z-10 absolute hidden mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Category
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-gray-700 border border-gray-300 hover:border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              <span className="material-symbols-outlined">swap_vert</span>
              Sort By
            </button>

            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/dashboard/requests/new")}
            type="button"
            className=" h-full w-56  text-white bg-primary hover:bg-primaryLighter focus:ring-4 focus:outline-none focus:ring-primaryLighter text-l rounded-lg py-2.5 flex justify-center items-center dark:bg-primary dark:hover:bg-primaryLighter dark:focus:ring-primaryLighter"
          >
            + New Request
          </button>
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
                Requester
              </th>
              <th scope="col" className="px-6 py-3">
                Volunteer
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-12 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr
                key={request.id}
                className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
              >
                <td className="px-6 py-4">{request.id}</td>
                <td className="px-6 py-4">{request.requester_name}</td>
                <td className="px-6 py-4">{request.volunteer_name}</td>
                <td className="px-6 py-4">{request.description}</td>
                <td className="px-6 py-4">{request.status_name}</td>
                <td className="px-6 py-4">{request.created_at}</td>
                <td className="px-6 py-4 flex gap-4">
                  <Link to={`/dashboard/requests/${request.id}`}>
                    <span class="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
                      visibility
                    </span>
                  </Link>
                  <Link to={`/dashboard/requests/${request.id}/edit`}>
                    <span class="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
                      edit
                    </span>
                  </Link>
                  <span
                    onClick={() => tryDelete(request.id)}
                    class="material-symbols-outlined cursor-pointer hover:text-red-500 "
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
          message={"Are you sure you want to delete this request?"}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
