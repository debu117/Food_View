import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/food-partner/${id}`);
        const partner = response.data.foodPartner;

        setProfile(partner);
        setVideos(Array.isArray(partner?.foodItems) ? partner.foodItems : []);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setVideos([]);
      }
    };

    if (id) fetchProfile();
  }, [id]);

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500"
            alt="profile"
          />

          <div className="profile-info">
            <h1 className="profile-pill profile-business">{profile?.name}</h1>
            <p className="profile-pill profile-address">{profile?.address}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-label">total meals</span>
            <span className="profile-stat-value">
              {profile?.totalMeals || 0}
            </span>
          </div>

          <div className="profile-stat">
            <span className="profile-stat-label">customers served</span>
            <span className="profile-stat-value">
              {profile?.customersServed || 0}
            </span>
          </div>
        </div>
      </section>

      <hr className="profile-sep" />

      <section className="profile-grid">
        {videos.length === 0 ? (
          <p>No videos available</p>
        ) : (
          videos.map((v) => (
            <div key={v._id} className="profile-grid-item">
              <video
                className="profile-grid-video"
                src={v.video}
                muted
                controls
              />
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Profile;
