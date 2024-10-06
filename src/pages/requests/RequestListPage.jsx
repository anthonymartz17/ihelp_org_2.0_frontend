import React from "react";
import RequestListTable from "../../components/requests-componets/RequestListTable";
import { useRequestsContext } from "../../context/RequestContextProvider";
export default function RequestsList() {
	useRequestsContext();
	return (
		<div className="flex flex-col gap-4 py-[4em] px-6">
			<h1 className="roboto-bold text-xl">Requests</h1>

			<RequestListTable />
		</div>
	);
}
