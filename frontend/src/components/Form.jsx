import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Form(route, method) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("route", { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        className="form-input"
        type="text"
        value="username"
        onchange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        className="form-input"
        type="text"
        value="password"
        onchange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button className="form-button" type="submit">
        {name}
      </button>
    </form>
  );
}
