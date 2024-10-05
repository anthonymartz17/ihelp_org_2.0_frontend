import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const requests = [
	{
		id: 1,
		organization_id: 1,
		volunteer_id: 1,
		volunteer_name: "Alice Johnson",
		requester_id: 1,
		requester_name: "Bob Smith",
		status_id: 1,
		status_name: "Open",
		description: "Help with grocery shopping",
		created_at: "2024-10-02T00:57:45.894Z",
		updated_at: "2024-10-02T00:57:45.894Z",
	},
	{
		id: 2,
		organization_id: 2,
		volunteer_id: 2,
		volunteer_name: "John Doe",
		requester_id: 2,
		requester_name: "Jane Doe",
		status_id: 2,
		status_name: "Assigned",
		description: "Assistance with home cleaning",
		created_at: "2024-10-02T00:57:45.894Z",
		updated_at: "2024-10-02T00:57:45.894Z",
	},
	{
		id: 3,
		organization_id: 3,
		volunteer_id: 3,
		volunteer_name: "Emily Davis",
		requester_id: 3,
		requester_name: "Michael Brown",
		status_id: 3,
		status_name: "In Progress",
		description: "Need a ride to the doctor",
		created_at: "2024-10-02T00:57:45.894Z",
		updated_at: "2024-10-02T00:57:45.894Z",
	},
	{
		id: 4,
		organization_id: 4,
		volunteer_id: 4,
		volunteer_name: "Chris Evans",
		requester_id: 4,
		requester_name: "Sarah Connor",
		status_id: 4,
		status_name: "Completed",
		description: "Help moving furniture",
		created_at: "2024-10-02T00:57:45.894Z",
		updated_at: "2024-10-02T00:57:45.894Z",
	},
	{
		id: 5,
		organization_id: 5,
		volunteer_id: 5,
		volunteer_name: "Jessica Adams",
		requester_id: 5,
		requester_name: "Tom Hanks",
		status_id: 3,
		status_name: "In Progress",
		description: "Deliver meals to elderly neighbors",
		created_at: "2024-10-02T00:57:45.894Z",
		updated_at: "2024-10-02T00:57:45.894Z",
	},
	{
		id: 6,
		organization_id: 1,
		volunteer_id: 1,
		volunteer_name: "Alice Johnson",
		requester_id: 1,
		requester_name: "Bob Smith",
		status_id: 1,
		status_name: "Open",
		description: "Help with grocery shopping",
		created_at: "2024-10-04T16:26:26.919Z",
		updated_at: "2024-10-04T16:26:26.919Z",
	},
	{
		id: 7,
		organization_id: 2,
		volunteer_id: 2,
		volunteer_name: "John Doe",
		requester_id: 2,
		requester_name: "Jane Doe",
		status_id: 1,
		status_name: "Open",
		description: "Assistance with home cleaning",
		created_at: "2024-10-04T16:26:26.919Z",
		updated_at: "2024-10-04T16:26:26.919Z",
	},
	{
		id: 8,
		organization_id: 3,
		volunteer_id: 3,
		volunteer_name: "Emily Davis",
		requester_id: 3,
		requester_name: "Michael Brown",
		status_id: 3,
		status_name: "In Progress",
		description: "Need a ride to the doctor",
		created_at: "2024-10-04T16:26:26.919Z",
		updated_at: "2024-10-04T16:26:26.919Z",
	},
	{
		id: 9,
		organization_id: 4,
		volunteer_id: 4,
		volunteer_name: "Chris Evans",
		requester_id: 4,
		requester_name: "Sarah Connor",
		status_id: 4,
		status_name: "Completed",
		description: "Help moving furniture",
		created_at: "2024-10-04T16:26:26.919Z",
		updated_at: "2024-10-04T16:26:26.919Z",
	},
	{
		id: 10,
		organization_id: 5,
		volunteer_id: 5,
		volunteer_name: "Jessica Adams",
		requester_id: 5,
		requester_name: "Tom Hanks",
		status_id: 3,
		status_name: "In Progress",
		description: "Deliver meals to elderly neighbors",
		created_at: "2024-10-04T16:26:26.919Z",
		updated_at: "2024-10-04T16:26:26.919Z",
	},
];

export default function RequestListTable({}) {
	return (
		<div>
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead class="text-gray-700 bg-gray-50 dark:bg-purplePrimary dark:text-gray-400">
						<tr class="text-white">
							<th scope="col" class="px-6 py-3">
								ID
							</th>
							<th scope="col" class="px-6 py-3">
								Requester
							</th>
							<th scope="col" class="px-6 py-3">
								Volunteer
							</th>
							<th scope="col" class="px-6 py-3">
								Description
							</th>
							<th scope="col" class="px-6 py-3">
								Status
							</th>
							<th scope="col" class="px-6 py-3">
								Due Date
							</th>
							<th scope="col" class="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{requests.map((request) => (
							<tr class="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200">
								<td class="px-6 py-4">{request.id}</td>
								<td class="px-6 py-4">{request.requester_name}</td>
								<td class="px-6 py-4">{request.volunteer_name}</td>
								<td class="px-6 py-4">{request.description}</td>
								<td class="px-6 py-4">{request.status_name}</td>
								<td class="px-6 py-4">{request.created_at}</td>
								<td class="px-6 py-4">
									<span class="material-symbols-outlined">more_vert</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
