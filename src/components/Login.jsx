import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = () => {
    if (loginUser(email, password, remember)) nav("/board");
    else setError("Invalid credentials");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input type="checkbox" onChange={(e) => setRemember(e.target.checked)} />
        Remember me
      </label>
      <button onClick={submit}>Login</button>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}