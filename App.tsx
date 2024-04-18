import { Image } from "react-native";
import UserList from "./src/components/UserList";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";

import userData from './src/data/data.json';

export default function App() {

  const data: User[] = userData.users;

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
        })
      }
    }
    fetchImage();
  }, [data]);

  return data && data.length > 0 && <UserList userInfo={data}/>;

}
