export const upload = async (url, file, token) => {
    const formData = new FormData();
    formData.append("picture", file); 

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method: "POST",
      headers, 
      body: formData,
    });
  };
  