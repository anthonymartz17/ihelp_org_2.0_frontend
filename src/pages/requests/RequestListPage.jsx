import React from "react";
import RequestListTable from "../../components/requests-componets/RequestListTable";
export default function RequestsList() {
	return (
		<div className="flex flex-col gap-4 py-3 px-6">
			<h1 className="roboto-bold text-xl">Requests</h1>

			<RequestListTable />
		</div>
	);
}
