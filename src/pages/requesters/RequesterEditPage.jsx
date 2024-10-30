import React, { useEffect, useState } from "react";
import RequesterForm from "../../components/forms/RequesterForm.jsx";

export default function RequesterEditPage({ requesterId }) {
  const [requesterData, setRequesterData] = useState(null);

  useEffect(() => {
    const fetchRequester = async () => {
      const data = await fakeApiCall(requesterId);
      setRequesterData(data);
    };

    fetchRequester();
  }, [requesterId]);

  const handleUpdate = (formData) => {};

  return (
    <div>
      <h1 className="text-center text-[24px] font-bold mb-4">Edit Requester</h1>
      {requesterData ? (
        <RequesterForm initialData={requesterData} onSubmit={handleUpdate} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
const fakeApiCall = async (id) => {
  return {
    firstName: "John",
    lastName: "Doe",
    phone: "(123) 456-7890",
    addressOne: "123 Main St",
    addressTwo: "Apt 4B",
    city: "Somewhere",
    state: "NY",
    zip: "10001",
  };
};
