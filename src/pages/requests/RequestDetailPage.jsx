import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RequestDetailPage() {
  const { id } = useParams();
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTel = (tel) =>
    `(${tel.slice(0, 3)}) ${tel.slice(3, 6)} - ${tel.slice(6)}`;

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/requests/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching request details");
        }
        const data = await response.json();
        setRequestDetail(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (loading) {
    return <p>Loading request details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Request Details</h1>
      {requestDetail ? (
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold mb-2">
            Request ID: {requestDetail.id}
          </h2>
          <p>
            <strong>Description:</strong> {requestDetail.description}
          </p>
          <p>
            <strong>Status:</strong> {requestDetail.status_name}
          </p>
          <p>
            <strong>Hours needed:</strong> {requestDetail.hours_needed}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(requestDetail.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(requestDetail.updated_at).toLocaleString()}
          </p>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Requester Information</h3>
            <p>
              <strong>Name:</strong> {requestDetail.requester_first_name}{" "}
              {requestDetail.requester_last_name}
            </p>
            <p>
              <strong>Phone:</strong> {formatTel(requestDetail.requester_phone)}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">Tasks Information</h3>
            <div className="block overflow-y-auto h-[200px]">
              {requestDetail.tasks.length > 0 ? (
                requestDetail.tasks.map((task) => (
                  <div key={task.id} className="border p-2 my-2">
                    <p>
                      <strong>Task ID:</strong> {task.id}
                    </p>
                    <p>
                      <strong>Description:</strong> {task.description}
                    </p>
                    <p>
                      <strong>Due Date:</strong>{" "}
                      {new Date(task.due_date).toLocaleString()}
                    </p>
                    <p>
                      <strong>Points Earned:</strong> {task.points_earned}
                    </p>
                    <h4 className="font-bold mt-2">Assigned Volunteer:</h4>
                    {task.volunteer_name
                      ? `${task.volunteer_name} (${task.volunteer_email})`
                      : "Unassigned"}
                  </div>
                ))
              ) : (
                <p>No tasks assigned</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No request details available</p>
      )}
    </div>
  );
}
