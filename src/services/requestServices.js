const IHELP_API_BASE_URL = import.meta.env.VITE_API_IHELP_URL;

export async function fetchRequests() {
  console.log("firring");
  try {
    const response = await fetch(`${IHELP_API_BASE_URL}/requests`);
    console.log(response, "response");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
}
