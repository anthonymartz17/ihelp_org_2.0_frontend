import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RequestDetailPage() {
  const { id } = useParams();
  const [requestDetail, setRequestDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(data);
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
            <strong>Status:</strong> {requestDetail.status.name}
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
            <h3 className="text-xl font-bold">Volunteer Information</h3>
            <p>
              <strong>Name:</strong> {requestDetail.volunteer.name}
            </p>
            <p>
              <strong>Email:</strong> {requestDetail.volunteer.email}
            </p>
            <p>
              <strong>Age:</strong> {requestDetail.volunteer.age}
            </p>
            <p>
              <strong>Points Earned:</strong>{" "}
              {requestDetail.volunteer.points_earned}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">Requester Information</h3>
            <p>
              <strong>Name:</strong> {requestDetail.requester.first_name}{" "}
              {requestDetail.requester.last_name}
            </p>
            <p>
              <strong>Phone:</strong> {requestDetail.requester.phone}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">Task Information</h3>
            {requestDetail.task.length > 0 ? (
              requestDetail.task.map((task) => (
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
                  <h4 className="font-bold mt-2">Assigned Volunteers:</h4>
                  {task.assigned_volunteers.map((volunteer) => (
                    <p key={volunteer.id}>
                      {volunteer.name} ({volunteer.email})
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <p>No tasks assigned</p>
            )}
          </div>
        </div>
      ) : (
        <p>No request details available</p>
      )}
    </div>
  );
}
