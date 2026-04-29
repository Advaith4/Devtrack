import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // 🔐 Get token + decode user
  const token = localStorage.getItem("token");

  let currentUser = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      currentUser = decoded;
    } catch (err) {
      console.log("Invalid token");
    }
  }

  // 🔄 Fetch users
  useEffect(() => {
  if (!token) {
    navigate("/");
  } else {
    fetchUsers();
  }
}, [token, navigate]);  

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Unauthorized ❌");
    }
  };

  // 🗑 Delete user (admin only)
  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      toast.error("Only admin can delete ❌");
    }
  };

  // 🚪 Logout
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
    <button onClick={() => navigate("/profile")}>
    Profile
    </button> 
    
    <div style={{
      maxWidth: "600px",
      margin: "auto",
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    }}>
      
      <h2 style={{ textAlign: "center" }}>Dashboard</h2>

      <p style={{ textAlign: "center", color: "gray" }}>
        Welcome, {currentUser?.email} ({currentUser?.role})
      </p>

      <button
        onClick={handleLogout}
        style={{
          display: "block",
          margin: "10px auto 20px",
          padding: "8px 16px",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <hr />

      {users.map((user) => (
        <div key={user._id} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #eee"
        }}>
          <span>
            {user.name} ({user.role})
          </span>

          {currentUser?.role === "admin" && (
            <button
              onClick={() => deleteUser(user._id)}
              style={{
                background: "#3498db",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}

    </div>
  </div>
);
}

export default Dashboard;