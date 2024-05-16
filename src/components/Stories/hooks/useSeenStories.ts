import { useCallback } from "react";
import { useStorage } from "./useStorage";

type StorySeenType = {
  userInfo: User[];
  currentUser: number;
  userStories: Story[];
};
interface MarkStoryAsSeenProps extends StorySeenType {
  currentStory: number;
}

export const useSeenStories = () => {
  const { getData, setData } = useStorage();

  const markStoryAsSeen = async ({
    userInfo,
    currentUser,
    userStories,
    currentStory,
  }: MarkStoryAsSeenProps) => {
    try {
      const data = await getData();
      if (data.length === 0) {
        await setData([
          ...data,
          {
            id: userInfo[currentUser].id.toString(),
            stories: [
              {
                id: userStories[currentStory].id.toString(),
              },
            ],
          },
        ]);
      } else {
        const user = data.find(
          (item) => item.id === userInfo[currentUser].id.toString()
        );
        if (!user) {
          data.push({
            id: userInfo[currentUser].id.toString(),
            stories: [
              {
                id: userStories[currentStory].id.toString(),
              },
            ],
          });
        } else {
          const story = user.stories.find(
            (item) => item.id === userStories[currentStory].id.toString()
          );
          if (!story) {
            user.stories.push({
              id: userStories[currentStory].id.toString(),
            });
          }
        }
        await setData(data);
      }
    } catch (err) {
      console.error("Erro ao salvar dados no AsyncStorage", err);
    }
  };

  const verifyStories = useCallback(
    async ({ userInfo, currentUser, userStories }: StorySeenType) => {
      try {
        const data = await getData();
        const user = data.find(
          (item) => item.id === userInfo[currentUser].id.toString()
        );
        if (user) {
          const lastStory = user.stories[user.stories.length - 1];
          const storyIndex = user.stories.findIndex(
            (item) => item.id === lastStory.id
          );
          if (storyIndex !== -1 && user.stories.length !== userStories.length) {
            return storyIndex + 1;
          }
        }
        return 0;
      } catch (err) {
        throw new Error("Erro ao verificar histórias");
      }
    },
    [getData]
  );

  const sortSeenStories = useCallback(async (userList: User[]) => {
    try {
      const data = await getData();
      const newArray = userList.reduce((acc, item, idx) => {
        const user = data.find(
          (userStorage) => Number(userStorage.id) === Number(item.id)
        );
        if (!!user) {
          if (item.images.length === user.stories.length) {
            const remove = acc.splice(idx, 1);
            acc.push(remove[0]);
          }
        }
        return acc;
      }, userList);
      return newArray;
    } catch (error) {
      console.error("Erro ao ordenar histórias", error);
    }
    return userList;
  }, []);


  const syncDataWithAPI = async (userList: User[]) => {
    try {
      // Obter dados do AsyncStorage
      const data = await getData();
  
      // Filtrar usuários e histórias que ainda existem na API
      const syncedData = data.filter((storageUser) =>
        userList.some((apiUser) => apiUser.id.toString() === storageUser.id)
      );
  
      syncedData.forEach((user) => {
        user.stories = user.stories.filter((story) =>
          userList.find((apiUser) => apiUser.id.toString() === user.id)?.images.some(
            (image) => image.id.toString() === story.id
          )
        );
      });
  
      // Atualizar AsyncStorage com os dados sincronizados
      await setData(syncedData);
    } catch (err) {
      console.error("Erro ao sincronizar dados com a API", err);
    }
  };

  return { markStoryAsSeen, verifyStories, sortSeenStories, syncDataWithAPI };
};
