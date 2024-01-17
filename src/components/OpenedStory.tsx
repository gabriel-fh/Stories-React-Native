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
  userInfo,
  closeStory,
  user,
}: {
  userInfo: User[];
  closeStory: Function;
  user: User;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<number>(
    userInfo.findIndex(
      (currentUserInfo) => currentUserInfo.user_id === user.user_id
    )
  );

  const nextStory = () => {
    console.log("next");
    if (currentStory !== userInfo[currentUser].stories.length - 1) {
      setCurrentStory((prevState) => prevState + 1);
    } else {
      if(currentUser !== userInfo.length - 1) {
        setCurrentUser((prevState) => prevState + 1)
        setCurrentStory(0)
      } else {
        closeStory()
      }
    }
  };
  const previousStory = () => {
    console.log("previous");
    if (currentStory - 1 >= 0) {
      setCurrentStory((prevState) => prevState - 1);
    } else {
      if(currentUser - 1 >= 0) {
        setCurrentUser((prevState) => prevState - 1);
        setCurrentStory(userInfo[currentUser - 1].stories.length - 1)
      } else {
        closeStory()
      }
    }
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
            {userInfo[currentUser].stories.map((index, key) => {
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
              source={userInfo[currentUser]?.user_avatar}
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <Text
              style={{ fontWeight: "500", fontSize: 14, color: "#fff" }}
            >{`${userInfo[currentUser].user_name}`}</Text>
          </View>
          <TouchableOpacity style={{ zIndex: 10 }} onPress={() => closeStory()}>
            <Text style={{ color: "#fff" }}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View key={item.story_image} style={{ zIndex: -1 }}> */}
      <Image
        source={userInfo[currentUser].stories[currentStory]?.story_image}
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
