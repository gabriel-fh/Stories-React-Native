import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

function OpenedStory({
  story,
  closeStory,
}: {
  story: User;
  closeStory: Function;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [currentStory, setCurrentStory] = useState<number>(0);

  const nextStory = () => {
    console.log("next");
    setCurrentStory((prevState) => prevState + 1);
  };
  const previousStory = () => {
    console.log("previous");
    setCurrentStory((prevState) => prevState - 1);
  };

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
        paddingVertical: 10,
      }}
    >
      <View style={{ position: "absolute", top: 35, left: 0 }}>
        <View style={{ marginBottom: 15 }}>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 10,
              paddingHorizontal: 10,
            }}
          >
            {story.stories.map((index, key) => {
              return (
                // THE BACKGROUND
                <View
                  key={key}
                  style={{
                    height: 3,
                    flex: 1,
                    flexDirection: "row",
                    backgroundColor: "rgba(117, 117, 117, 0.5)",
                    marginHorizontal: 2,
                  }}
                >
                  {/* THE ANIMATION OF THE BAR*/}
                  <Animated.View
                    style={{
                      // flex: current == key ? progress : content[key].finish,
                      height: 3,
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
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
          <TouchableOpacity style={{ zIndex: 10 }} onPress={() => closeStory()}>
            <Text style={{ color: "#fff" }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View key={item.story_image} style={{ zIndex: -1 }}> */}
        <Image
          source={story.stories[currentStory].story_image}
          style={{ height: "100%", width: "100%" }}
          resizeMode="contain"
        />
      {/* </View> */}

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          height: "80%",
          width: "100%",
          zIndex: 999,
          position: "absolute",
          bottom: 50,
        }}
      >
        <TouchableWithoutFeedback onPress={() => previousStory()}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => nextStory()}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

export default OpenedStory;
