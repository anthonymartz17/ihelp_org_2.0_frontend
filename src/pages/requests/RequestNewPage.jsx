import React from "react";
import RequestForm from "../../components/forms/RequestForm";

export default function RequestNewPage() {
  const handleCreate = (formData) => {
    console.log("Creating requester:", formData);
  };

  return (
    <div>
      <h1 className="ml-4 text-[18px] font-bold mb-4">
        New Request
      </h1>
      <RequestForm onSubmit={handleCreate} />
    </div>
  );
}
