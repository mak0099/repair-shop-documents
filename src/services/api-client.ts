// src/services/api-client.ts

import axios from "axios";

// Debugging: Check if API URL is loaded
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// =============================
// Request Interceptor
// =============================
apiClient.interceptors.request.use(
  (config) => {
    // example: auth token
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// =============================
// Response Interceptor
// =============================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // example global error log
    console.error("API Error:", error?.response?.data || error.message);

    // future: auto logout on 401
    // if (error.response?.status === 401) {}

    return Promise.reject(error);
  }
);
