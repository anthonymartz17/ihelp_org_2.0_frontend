export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function formatShortDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "numeric",
		day: "numeric",
		year: "2-digit",
	});
}

export function formatMilitaryToStandardTime(militaryTime) {
	// Split the time into hours and minutes
	const [hours, minutes] = militaryTime.split(":");

	// Convert hours to number for comparison
	const hourNum = parseInt(hours);

	// Determine period and convert to 12-hour format
	const period = hourNum >= 12 ? "PM" : "AM";
	const hour12 = hourNum % 12 || 12;

	return `${hour12}:${minutes} ${period}`;
}

export function extractDate(dateString) {
	return new Date(dateString).toISOString().split("T")[0];
}
