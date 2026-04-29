import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // ✅ MOVE HERE

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🚀");

      navigate("/dashboard");   // ✅ works now

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      toast.error("Login failed ❌");
    }
  };

  return (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f6fa"
  }}>
    
    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      width: "300px",
      textAlign: "center"
    }}>
      
      <h2>Login</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>

    </div>
  </div>
);  
}

export default Login;