export const api = async (url, method = "GET", body, token) => {
    const headers = {
      "Content-Type": "application/json",
    };
  
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method,
      headers,
      body: method !== "GET" && body ? JSON.stringify(body) : null,
    });
  };
  