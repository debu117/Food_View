import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import "../../styles/reels.css";
import { useNavigate, Link } from "react-router-dom";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  // Autoplay behavior is handled inside ReelFeed

  useEffect(() => {
    axios
      .get("/food")
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch(() => {});
  }, []);

  async function likeVideo(item) {
    try {
      const response = await axios.post("/food/like", {
        foodId: item._id,
      });

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
      console.log(err);
    }
  }

  async function saveVideo(item) {
    const response = await axios.post("/food/save", {
      foodId: item._id,
    });

    setVideos((prev) =>
      prev.map((v) =>
        v._id === item._id
          ? {
              ...v,
              savesCount: response.data.save
                ? v.savesCount + 1
                : v.savesCount - 1,
            }
          : v,
      ),
    );
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
