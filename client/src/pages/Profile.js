import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    try {
      // If you have a /users/me route, use that:
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to load profile ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f6fa",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <div style={{
        maxWidth: "500px",
        margin: "auto",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Profile</h2>

        {user ? (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <br />

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

        <button
          onClick={handleLogout}
          style={{
            marginLeft: "10px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;