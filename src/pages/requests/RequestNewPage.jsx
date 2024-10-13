import React from "react";
import RequestForm from "../../components/forms/RequestForm";

export default function RequestNewPage() {
  const handleCreate = (formData) => {
    console.log("Creating requester:", formData);
  };

  return (
    <div>
      <h1 className="text-center text-[24px] font-bold mb-4">
        Create New Request
      </h1>
      <RequestForm onSubmit={handleCreate} />
    </div>
  );
}
