import { useEffect } from "react";

function AdminPageRedirect() {
  useEffect(() => {
    // Full redirect to a different site
    window.location.href = "http://localhost:5173";
  }, []);

  return null; // No UI needed
}

export default AdminPageRedirect;
