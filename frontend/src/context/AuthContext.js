// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  const login = async (username, password) => {
    const response = await axios.post("http://localhost:3001/users/login", {
      username,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    setAuthToken(token);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setAuthToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
