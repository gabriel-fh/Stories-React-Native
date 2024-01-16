import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import OpenedStory from "./OpenedStory";

function AvatarIconStories() {
  const userInfo: User[] = [
    {
      user_id: 1,
      user_name: "Coca-Cola",
      user_avatar: require("../../assets/stories/avatar-image/coca-cola-avatar.jpg"),
      stories: [
        {
          story_id: 1,
          story_image: require("../../assets/stories/story-image/coca-story-1.png"),
        },
      ],
    },
    {
      user_id: 2,
      user_name: "Absolut Vodka",
      user_avatar: require("../../assets/stories/avatar-image/absolut-vodka-avatar.jpg"),
    },
    {
      user_id: 3,
      user_name: "Cerveja Therezópolis",
      user_avatar: require("../../assets/stories/avatar-image/cerveja-therezopolis-avatar.jpg"),
    },
    {
      user_id: 4,
      user_name: "Vale Carioca",
      user_avatar: require("../../assets/stories/avatar-image/vale-carioca-avatar.jpg"),
    },
    {
      user_id: 5,
      user_name: "Minuano",
      user_avatar: require("../../assets/stories/avatar-image/minuano-avatar.jpg"),
    },
    {
      user_id: 6,
      user_name: "Italac",
      user_avatar: require("../../assets/stories/avatar-image/italac-avatar.jpg"),
    },
    {
      user_id: 7,
      user_name: "Italac",
      user_avatar: require("../../assets/stories/avatar-image/chivas-avatar.jpg"),
    },
  ];

  const [openedStory, setOpenedStory] = useState<User | null>(null);

  const handlePressUser = (user: User) => {
    setOpenedStory(user);
  };

  const handleCloseStory = () => {
    setOpenedStory(null);
  };

  return (
    <View style={{ paddingTop: 50, flex: 1 }}>
      <FlatList
        data={userInfo}
        keyExtractor={(item) => item.user_id.toString()}
        horizontal={true}
        style={{ flex: 1, maxHeight: 200 }}
        ItemSeparatorComponent={() => <View style={{ width: 15 }}></View>}
        ListHeaderComponent={() => <View style={{ width: 12 }}></View>}
        ListFooterComponent={() => <View style={{ width: 20 }}></View>}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                width: 70,
                flex: 1,
              }}
              onPress={() => handlePressUser(item)}
            >
              <View
                style={{
                  height: 70,
                  width: 70,
                  padding: 1,
                  borderWidth: 3,
                  borderColor: "#29abe2",
                  borderRadius: 100,
                }}
              >
                <Image
                  source={item.user_avatar}
                  style={{ height: "100%", width: "100%", borderRadius: 100 }}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  width: "100%",
                  textAlign: "center",
                  marginTop: 5,
                  fontWeight: "500",
                  fontSize: 14,
                }}
                numberOfLines={1}
              >
                {item.user_name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {openedStory && (
        <OpenedStory
          story={openedStory}
          closeStory={handleCloseStory}
        ></OpenedStory>
      )}
    </View>
  );
}

export default AvatarIconStories;
