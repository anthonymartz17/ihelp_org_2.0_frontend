import React from "react";

import RequestForm from "../../components/forms/RequestForm";

export default function NewRequestPage() {
	return (
		<div>
			<h1 className="subtitle-heading text-dark ml-4 mb-4">New Request</h1>
			<RequestForm />
		</div>
	);
}
