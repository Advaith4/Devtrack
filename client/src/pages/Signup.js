import { useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password,
        role: "user", // default role
      });

      toast.success("Signup successful 🎉");
      navigate("/"); // go to login

    } catch (err) {
      console.log(err.response?.data);
      toast.error("Signup failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;