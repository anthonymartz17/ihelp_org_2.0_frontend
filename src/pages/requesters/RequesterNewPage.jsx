import React from "react";
import RequesterForm from "../../components/forms/RequesterForm.jsx";

export default function RequesterNewPage() {
  const handleCreate = (formData) => {
    console.log("Creating requester:", formData);
  };

  return (
    <div>
      <h1 className="text-center text-[24px] font-bold mb-4">
        Create New Requester
      </h1>
      <RequesterForm onSubmit={handleCreate} />
    </div>
  );
}
