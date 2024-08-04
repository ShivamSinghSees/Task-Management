import { FeatureState } from "@/lib/type";
import { createSlice } from "@reduxjs/toolkit";
const initialState: FeatureState = {
  feature: [
    {
      title: "Introducing tags",
      description:
        "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
      imgUrl: "/introduction-tag.svg",
    },
    {
      title: "Share Notes Instantly",
      description:
        "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
      imgUrl: "/share-notes.svg",
    },
    {
      title: "Access Anywhere",
      description:
        "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
      imgUrl: "/access-anywhere.svg",
    },
  ],
  isLoading: false,
  error: null,
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {},
});

export default featureSlice.reducer;
