import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import "../../styles/reels.css";
import { useNavigate, Link } from "react-router-dom";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  // Autoplay behavior is handled inside ReelFeed

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/food`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        setVideos(response.data.foodItems);
      })
      .catch(() => {
        /* noop: optionally handle error */
      });
  }, []);

  // Using local refs within ReelFeed; keeping map here for dependency parity if needed

  async function likeVideo(item) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { foodId: item._id },
        { withCredentials: true },
      );

      console.log("LIKE RESPONSE:", response.data);

      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? {
                ...v,
                likeCount: response.data.likeCount ?? response.data.likesCount,
                isLiked: response.data.like,
              }
            : v,
        ),
      );
    } catch (err) {
      console.log("LIKE ERROR:", err);
    }
  }

  /*else {
      console.log("Video unliked");
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v,
        ),
      );
    }
  }*/

  async function saveVideo(item) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/food/save`,
      { foodId: item._id },
      { withCredentials: true },
    );

    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v,
        ),
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v,
        ),
      );
    }
  }

  return (
    <ReelFeed
      items={videos}
      onLike={likeVideo}
      onSave={saveVideo}
      emptyMessage="No videos available."
    />
  );
};

export default Home;
/**/
