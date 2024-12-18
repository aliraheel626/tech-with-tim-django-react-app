import { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import { Link } from "react-router-dom";
function Form({ route, method }) {
  console.log(method);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const DynamicLink = ({ method }) => {
    const target = method === "login" ? "/register" : "/login";
    const text =
      method === "login"
        ? "Don't have an account? Register"
        : "Already have an account? Login";

    return (
      <p style={{ textAlign: "center", fontSize: "14px", marginTop: "20px" }}>
        {/* {text}{" "} */}
        <Link to={target} style={{ color: "#007BFF", textDecoration: "none" }}>
          {text}
        </Link>
      </p>
    );
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      console.log("Response:", res.data); // Logs successful response data

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (e) {
      // Log the error response
      if (e.response) {
        console.log("Error response body:", e.response.data); // Logs the response body
        console.log("Error status code:", e.response.status); // Logs the status code
      } else {
        console.log("Unexpected error:", e); // Logs unexpected errors
      }
      alert(e.response?.data?.detail || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{method === "login" ? "Login" : "Register"}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {loading && <LoadingIndicator />}
      <button className="form-button" type="submit">
        {method === "login" ? "Login" : "Register"}
      </button>
      <DynamicLink method={method} />
    </form>
  );
}

export default Form;
