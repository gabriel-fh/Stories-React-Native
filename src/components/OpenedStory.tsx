// import { ResizeMode, Video, VideoProps } from "expo-av";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import ProgressBar from "./ProgressBar";

function OpenedStory({
  userInfo,
  closeStory,
  user,
  isLoading,
}: {
  userInfo: User[];
  closeStory: Function;
  user: User;
  isLoading: boolean;
}) {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<number>(
    userInfo.findIndex(
      (currentUserInfo) => currentUserInfo.user_id === user.user_id
    )
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const videoRef = useRef<Video>(null);
  const [progress, setProgress] = useState(0)

  const pauseStory = function () {
    setIsPaused(true);
    if (
      userInfo[currentUser].stories[currentStory].story_video &&
      videoRef.current
    ) {
      videoRef.current.pauseAsync();
    }
  };

  const resumeStory = function () {
    setIsPaused(false);

    if (
      userInfo[currentUser].stories[currentStory].story_video &&
      videoRef.current
    ) {
      videoRef.current.playAsync();
    }
  };

  const nextStory = () => {
    if (currentStory !== userInfo[currentUser].stories.length - 1) {
      setCurrentStory((prevState) => prevState + 1);
      setLoad(false);
    } else {
      if (currentUser !== userInfo.length - 1) {
        setCurrentUser((prevState) => prevState + 1);
        setCurrentStory(0);
        setLoad(false);
      } else {
        closeStory();
      }
    }
    setProgress(0);
  };

  const previousStory = () => {
    if (currentStory - 1 >= 0) {
      setCurrentStory((prevState) => prevState - 1);
      setLoad(false);
    } else {
      if (currentUser - 1 >= 0) {
        setCurrentUser((prevState) => prevState - 1);
        setCurrentStory(userInfo[currentUser - 1].stories.length - 1);
        setLoad(false);
      } else {
        closeStory();
      }
    }
    setProgress(0)
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 999999,
          height: Dimensions.get("screen").height,
          width: "100%",
          backgroundColor: "#000",
          paddingVertical: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // marginTop: Platform.OS === 'ios' ? 33 : 0
        }}
      >
        <View style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 100,
            }}
          />
          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                flex: 1,
                paddingTop: 10,
                paddingHorizontal: 10,
                height: 15,
                flexDirection: "row",
                // backgroundColor:'green'
              }}
            >
              {userInfo[currentUser].stories.map((_, index) => {
                return (
                  <ProgressBar
                    key={index}
                    index={index}
                    duration={5}
                    nextStory={nextStory}
                    isPaused={isPaused}
                    isActive={currentStory === index}
                    progress={progress}
                    setProgress={setProgress}
                  />
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
              zIndex: 99999,
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
            <TouchableOpacity
              style={{ zIndex: 10 }}
              onPress={() => closeStory()}
            >
              <Text style={{ color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
        {userInfo[currentUser].stories[currentStory].story_image ? (
          <>
            {!isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                  backgroundColor: "#00",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
              </View>
            ) : (
              <Image
                source={{
                  uri: userInfo[currentUser].stories[currentStory].story_image,
                }}
                style={{ height: "100%", width: "100%" }}
                resizeMode="cover"
              />
            )}
          </>
        ) : (
          <>
            {!load && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width,
                  backgroundColor: "#00",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}

            <Video
              ref={videoRef}
              source={{
                uri: userInfo[currentUser].stories[currentStory].story_video,
              }}
              rate={1.0}
              volume={1.0}
              resizeMode={ResizeMode.CONTAIN}
              positionMillis={0}
              shouldPlay={true}
              onPlaybackStatusUpdate={(AVPlaybackStatus) => {
                // console.log(AVPlaybackStatus.isLoaded);
                setLoad(AVPlaybackStatus.isLoaded);
              }}
              onReadyForDisplay={() => {}}
              style={{ height: "100%", width: "100%" }}
            />
          </>
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: "91%",
            width: "100%",
            zIndex: 999,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => previousStory()}
            onLongPress={() => pauseStory()}
            onPressOut={() => resumeStory()}
          >
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => nextStory()}
            onLongPress={() => pauseStory()}
            onPressOut={() => resumeStory()}
          >
            {/* <PanGestureHandler
              onGestureEvent={handleGestureEvent}
              onHandlerStateChange={handleHandlerStateChange}
            >
            </PanGestureHandler> */}
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 40,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 20,
            paddingBottom: 30,
            paddingTop: 20,
          }}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,1)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
            }}
          />
          <Text style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: 30 }}>
            ^
          </Text>
          <Text style={{ color: "rgba(255, 255, 255, 0.75)" }}>
            Arraste pra cima
          </Text>
        </View>
      </View>
    </>
  );
}

export default OpenedStory;
