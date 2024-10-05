import { createBrowserRouter, Navigate } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/DashboardPage";
import RequestsListPage from "../pages/requests/RequestListPage";
import RequestDetailPage from "../pages/requests/RequestDetailPage";
import RequestNewPage from "../pages/requests/RequestNewPage";
import RequestEditPage from "../pages/requests/RequestEditPage";
import VolunteerListPage from "../pages/volunteers/VolunteerListPage";
import VolunteerDetailPage from "../pages/volunteers/VolunteerDetailPage";
import VolunteerNewPage from "../pages/volunteers/VolunteerNewPage";
import VolunteerEditPage from "../pages/volunteers/VolunteerEditPage";
import RequesterListPage from "../pages/requesters/RequesterListPage";
import RequesterDetailPage from "../pages/requesters/RequesterDetailPage";
import RequesterNewPage from "../pages/requesters/RequesterNewPage";
import RequesterEditPage from "../pages/requesters/RequesterEditPage";
import BadgeListPage from "../pages/badges/BadgeListPage";
import BadgeDetailPage from "../pages/badges/BadgeDetailPage";
import BadgeNewPage from "../pages/badges/BadgeNewPage";
import BadgeEditPage from "../pages/badges/BadgeEditPage";
import RewardListPage from "../pages/rewards/RewardListPage";
import RewardDetailPage from "../pages/rewards/RewardDetailPage";
import RewardNewPage from "../pages/rewards/RewardNewPage";
import RewardEditPage from "../pages/rewards/RewardEditPage";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
		children: [
			{
				path: "",
				element: <RequestsListPage />,
			},
			{
				path: "requests/:id",
				element: <RequestDetailPage />,
			},
			{
				path: "requests/new",
				element: <RequestNewPage />,
			},
			{
				path: "requests/:id/edit",
				element: <RequestEditPage />,
			},

			{
				path: "volunteers",
				element: <VolunteerListPage />,
			},
			{
				path: "volunteers/:id",
				element: <VolunteerDetailPage />,
			},
			{
				path: "volunteers/new",
				element: <VolunteerNewPage />,
			},
			{
				path: "volunteers/:id/edit",
				element: <VolunteerEditPage />,
			},

			{
				path: "requesters",
				element: <RequesterListPage />,
			},
			{
				path: "requesters/:id",
				element: <RequesterDetailPage />,
			},
			{
				path: "requesters/new",
				element: <RequesterNewPage />,
			},
			{
				path: "requesters/:id/edit",
				element: <RequesterEditPage />,
			},
			{
				path: "badges",
				element: <BadgeListPage />,
			},
			{
				path: "badges/:id",
				element: <BadgeDetailPage />,
			},
			{
				path: "badges/new",
				element: <BadgeNewPage />,
			},
			{
				path: "badges/:id/edit",
				element: <BadgeEditPage />,
			},
			{
				path: "rewards",
				element: <RewardListPage />,
			},
			{
				path: "rewards/:id",
				element: <RewardDetailPage />,
			},
			{
				path: "rewards/new",
				element: <RewardNewPage />,
			},
			{
				path: "rewards/:id/edit",
				element: <RewardEditPage />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
export default router;
