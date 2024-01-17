import { StyleSheet, Text, View } from 'react-native';
import AvatarIconStories from './src/components/AvatarIconStories';

export default function App() {
  const userInfo: User[] = [
    {
      user_id: 1,
      user_name: "Coca-Cola",
      user_avatar: require("./assets/stories/avatar-image/coca-cola-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("./assets/stories/story-image/coca-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/coca-story-2.png"),
        },
      ],
    },
    {
      user_id: 2,
      user_name: "Absolut Vodka",
      user_avatar: require("./assets/stories/avatar-image/absolut-vodka-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("./assets/stories/story-image/absolute-story-1.png"),
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
          story_image: require("./assets/stories/story-image/therezopolis-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/therezopolis-story-2.png"),
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
          story_image: require("./assets/stories/story-image/vale-carioca-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/vale-carioca-story-2.png"),
        },
      ],
    },
    {
      user_id: 5,
      user_name: "Minuano",
      user_avatar: require("./assets/stories/avatar-image/minuano-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("./assets/stories/story-image/minuano-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/minuano-story-2.png"),
        },
      ],
    },
    {
      user_id: 6,
      user_name: "Italac",
      user_avatar: require("./assets/stories/avatar-image/italac-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("./assets/stories/story-image/italac-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/italac-story-2.png"),
        },
      ],
    },
    {
      user_id: 7,
      user_name: "Chivas",
      user_avatar: require("./assets/stories/avatar-image/chivas-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("./assets/stories/story-image/chivas-story-1.png"),
        },
        {
          story_id: 2,
          story_image: require("./assets/stories/story-image/chivas-story-2.png"),
        },
      ],
    },
  ];

  return (
    <View style={{flex:1}}>
      <AvatarIconStories userInfo={userInfo}></AvatarIconStories>
    </View>
  );
}

