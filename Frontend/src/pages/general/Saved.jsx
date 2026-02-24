import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "../../utils/axios";
import ReelFeed from "../../components/ReelFeed";

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await axios.get("/food/save");

        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));

        setVideos(savedFoods);
      } catch (err) {
        console.error("Error fetching saved foods:", err);
      }
    };

    fetchSaved();
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post("/food/save", {
        foodId: item._id,
      });

      setVideos((prev) => prev.filter((v) => v._id !== item._id));
    } catch (err) {
      console.error("Error removing saved:", err);
    }
  };

  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
