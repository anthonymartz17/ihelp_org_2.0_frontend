import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function BadgesDetailPage() {
  const { id } = useParams();
  const [badge, setBadge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/badges/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error fetching badge details");
        }
        const data = await response.json();
        setBadge(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBadge();
  }, [id]);
  if (loading) {
    return <p>Loading badge details...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Badge Details</h1>
      {badge ? (
        <div className="border rounded-lg shadow p-4">
          <h2 className="text-2xl font-bold mb-2">
           Badge ID: {badge.id}
          </h2>
          <p>
            <strong>Name:</strong> {badge.name}
          </p>
          <p>
            <strong>Description:</strong> {badge.description}
          </p>
          <p>
            <strong>Image:</strong> {badge.img_url}
          </p>
          <p>
            <strong>Requirement:</strong> {badge.requirement}
          </p>

          
        </div>
      ) : (
        <p>No badge details available.</p>
      )}

    </div>
  )



}
