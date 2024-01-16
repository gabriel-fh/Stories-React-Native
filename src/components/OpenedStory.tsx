import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";

function OpenedStory({
  story,
  closeStory,
}: {
  story: User;
  closeStory: Function;
}) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 999999,
        height: Dimensions.get("window").height,
        width: "100%",
        backgroundColor: "#330000",
        paddingVertical: 20,
      }}
    >
      <View style={{ position: "absolute", top: 60, left: 0 }}>
        <View></View>
        <View
          style={{
            width: Dimensions.get("window").width,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={story.user_avatar}
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontWeight: "500", fontSize: 14, color: "#fff" }}
            >{`${story.user_name}`}</Text>
          </View>
          <TouchableOpacity style={{zIndex: 10}} onPress={() => closeStory()}>
            <Text style={{ color: "#fff" }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={story.stories && story.stories[0].story_image}
        style={{ height: "100%", width: "100%" }}
        resizeMode="contain"
      />
    </View>
  );
}

export default OpenedStory;
