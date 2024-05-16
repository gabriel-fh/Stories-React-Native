import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import userData from "../../data/data.json";
import UserList from "./UserList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSeenStories } from "./hooks/useSeenStories";

export default function Stories() {
  const data: User[] = userData.users;

  const { syncDataWithAPI } = useSeenStories();

  useEffect(() => {
    if (data) {
      syncDataWithAPI(data);
    }
  }, [data]);

  useEffect(() => {
    async function fetchImage() {
      if (data) {
        data.forEach(async (user) => {
          user.images.forEach(async (story) => {
            if (story.image) {
              const name = story.image.split("/").pop();
              const path = `${FileSystem.cacheDirectory}${name}`;
              const image = await FileSystem.getInfoAsync(path);
              if (!image.exists) {
                await FileSystem.downloadAsync(story.image, path);
              }
            }
          });
        });
      }
    }
    fetchImage();
  }, [data]);

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  return data && data.length > 0 && <UserList userInfo={data} />;
}
