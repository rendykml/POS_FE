import { useEffect, useState } from "react";
import axios from "../utils/axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.data);

      } catch (err) {
        setError("Gagal mengambil profile");
        console.log(err);
      }
    };

    getProfile();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {profile ? (
        <div>
          <p>ID: {profile.id}</p>
          <p>Username: {profile.username}</p>
          <p>Role: {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
