import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function RequesterDetailPage() {
  const { id } = useParams();
  const [requesterDetail, setRequesterDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRequesterDetail = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/requesters/${id}`, 
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
        if (!response.ok) {
          throw new Error('Error fetching requester details');
        }
        const data = await response.json();
        setRequesterDetail(data);
      }  catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequesterDetail();
    }, [id]);

    if (loading) {
      return <p>Loading requester details...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    return (
      <div className="container mx-auto p-6">
     <h1 className="text-3xl font-roboto mb-4">Requester Details</h1>
     {requesterDetail ? (
          <div className="border rounded-lg shadow p-4">
            <h2 className="text-2xl font-bold mb-2">
              Requester ID: {requesterDetail.id}
              </h2>
              <p>
                <strong>Name:</strong> {requesterDetail.first_name}
              </p>
              <p>
                <strong>Phone Number:</strong> {requesterDetail.phone}
                </p>
                <p>
                  <strong>Status:</strong> {requesterDetail.is_active ? 'Active' : 'Inactive'}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(requesterDetail.created_at).toLocaleString()}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(requesterDetail.updated_at).toLocaleString()}
                    </p>
                    </div>
      ) : (
        <p>No requester details found.</p>
      )}
    </div>
  );
}
      
                  
