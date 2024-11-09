import React from "react";
import RequestListTable from "../../components/requests-components/RequestListTable";
import { useRequestsContext } from "../../context/RequestContextProvider";

export default function RequestsList() {
  useRequestsContext();
  return (
    <div className="flex flex-col gap-4 pt-[3em] px-6">
      <h1 className="roboto-bold text-xl text-dark">Requests</h1>

      <RequestListTable />
    </div>
  );
}
