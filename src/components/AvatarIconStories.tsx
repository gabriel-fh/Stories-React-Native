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

function AvatarIconStories({userInfo, isLoading} : {userInfo: User[], isLoading: boolean}) {

  const [openedStory, setOpenedStory] = useState<User | null>(null);

  const handlePressUser = (user: User) => {
    setOpenedStory(user);
  };

  const handleCloseStory = () => {
    setOpenedStory(null);
    console.log('fechou')
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
                height: 100,
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
          userInfo={userInfo}
          closeStory={handleCloseStory}
          user={openedStory}
          isLoading={isLoading}
        ></OpenedStory>
      )}
    </View>
  );
}

export default AvatarIconStories;
