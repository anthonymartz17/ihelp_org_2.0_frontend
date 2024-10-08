import { createContext, useContext, useEffect, useState } from "react";
import { fetchRequests } from "../services/RequestServices";

const RequestContext = createContext({});

export function RequestContextProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getRequests() {
      setLoading(true);
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getRequests();
  }, []);

  const contextValue = {
    requests,
    loading,
    error,
  };

  return (
    <RequestContext.Provider value={contextValue}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequestsContext() {
  return useContext(RequestContext);
}
