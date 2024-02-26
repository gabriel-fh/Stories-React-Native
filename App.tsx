import { Image, SafeAreaView, View } from "react-native";
import AvatarIconStories from "./src/components/AvatarIconStories";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const userInfo: User[] = [
    {
      user_id: 1,
      user_name: "Coca-Cola",
      user_avatar: require("./assets/stories/avatar-image/coca-cola-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image:
            "https://assets.b9.com.br/wp-content/uploads/2023/04/KV-ccsa-1280x720.png",
        },
        // {
        //   story_id: 2,
        //   story_video:
        //     "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/2.mp4?alt=media&token=fcd41460-a441-4841-98da-d8f9a714dd4d",
        // },
      ],
    },
    {
      user_id: 2,
      user_name: "Absolut Vodka",
      user_avatar: require("./assets/stories/avatar-image/absolut-vodka-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image:
            "https://carrefourbrfood.vtexassets.com/arquivos/ids/129458105/vodka-absolut---1-litro-5.jpg?v=638295205315530000",
        },
      ],
    },
    {
      user_id: 3,
      user_name: "Cerveja Therezópolis",
      user_avatar: require("./assets/stories/avatar-image/cerveja-therezopolis-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image:
            "https://cervejatherezopolis.com.br/wp-content/uploads/2023/05/img-there-site.jpg",
        },
        {
          story_id: 2,
          story_image: "https://pbs.twimg.com/media/F_tZnw9WcAA34La.jpg",
        },
      ],
    },
    {
      user_id: 4,
      user_name: "Vale Carioca",
      user_avatar: require("./assets/stories/avatar-image/vale-carioca-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: "https://i.ytimg.com/vi/LonHiUcXiMs/maxresdefault.jpg",
        },
        {
          story_id: 2,
          story_image:
            "https://img.sitemercado.com.br/produtos/d4e8909509a0df113d79a7c59eeb4bde7febec8a4e28b1d73d9b03c568956254_full.jpg",
        },
        {
          story_id: 3,
          story_image: "https://i.ytimg.com/vi/LonHiUcXiMs/maxresdefault.jpg",
        },
      ],
    },
    // {
    //   user_id: 5,
    //   user_name: "Minuano",
    //   user_avatar: require("./assets/stories/avatar-image/minuano-avatar.jpg"),
    //   stories: [
    //     {
    //       story_id: 1,
    //       story_image: require("./assets/stories/story-image/minuano-story-1.png"),
    //     },
    //     {
    //       story_id: 2,
    //       story_image: require("./assets/stories/story-image/minuano-story-2.png"),
    //     },
    //   ],
    // },
    // {
    //   user_id: 6,
    //   user_name: "Italac",
    //   user_avatar: require("./assets/stories/avatar-image/italac-avatar.jpg"),
    //   stories: [
    //     {
    //       story_id: 1,
    //       story_image: require("./assets/stories/story-image/italac-story-1.png"),
    //     },
    //     {
    //       story_id: 2,
    //       story_image: require("./assets/stories/story-image/italac-story-2.png"),
    //     },
    //   ],
    // },
    // {
    //   user_id: 7,
    //   user_name: "Chivas",
    //   user_avatar: require("./assets/stories/avatar-image/chivas-avatar.jpg"),
    //   stories: [
    //     {
    //       story_id: 1,
    //       story_image: require("./assets/stories/story-image/chivas-story-1.png"),
    //     },
    //     {
    //       story_id: 2,
    //       story_image: require("./assets/stories/story-image/chivas-story-2.png"),
    //     },
    //     {
    //       story_id: 3,
    //       story_image: require("./assets/stories/story-image/chivas-story-2.png"),
    //     },
    //   ],
    // },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    for (const user of userInfo) {
      for (const story of user.stories) {
        if (story.story_image) {
          Image.prefetch(story.story_image)
            .then(() => setIsLoading(true))
            .catch((err) => {
              setIsLoading(false);
              console.log("Erro ao carregar imagens: " + err);
            });
        }
      }
    }
  }, []);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      // <GestureHandlerRootView style={{ flex: 1 }}>
        <AvatarIconStories
          userInfo={userInfo}
          isLoading={isLoading}
        ></AvatarIconStories>
      // {/* </GestureHandlerRootView> */}
    /* </SafeAreaView> */
  );
}
