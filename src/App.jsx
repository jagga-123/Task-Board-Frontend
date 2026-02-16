import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./auth.js";
import Board from "./components/Board";
import Login from "./components/Login";

const Protected = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/" />;

export default function App() {
  return (
    <BrowserRouter basename="/Task-Board-Frontend/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/board"
          element={
            <Protected>
              <Board />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}