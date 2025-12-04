import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivatePage() {
  const [currentUser, setCurrentUser] = useState(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) return ""; 
    try {
      const decodedToken = jwtDecode(jwtToken);
      return decodedToken.username || "";
    } catch {
      return "";
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt-authorization");
    if (!jwtToken) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(jwtToken);
    } catch (error) {
      console.error("Invalid JWT", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("jwt-authorization");
    setCurrentUser("");
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome {currentUser}</h1>
      <h1>Private Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
