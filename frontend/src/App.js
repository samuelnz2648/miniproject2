// frontend/src/App.js

import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage"; // Renamed PreLoginPage to LoginPage
import Dashboard from "./components/Dashboard"; // Renamed LoginPage to Dashboard
import RegisterPage from "./components/RegisterPage";
import TodoPage from "./components/TodoPage";
import SummaryPage from "./components/SummaryPage";
import { TodoProvider } from "./context/TodoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/todos"
              element={<ProtectedRoute component={TodoPage} />}
            />
            <Route
              path="/summary"
              element={<ProtectedRoute component={SummaryPage} />}
            />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? <Component /> : <Navigate to="/" />;
};

export default App;
