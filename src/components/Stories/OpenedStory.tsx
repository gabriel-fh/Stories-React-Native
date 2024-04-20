import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import ProgressBar from "./ProgressBar";
import { Icon } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import BottomSheet, { BottomSheetMethods } from "../BottomSheet/BottomSheet";
import { SafeAreaProvider } from "react-native-safe-area-context";

function OpenedStory({
  userInfo,
  closeStory,
  user,
}: {
  userInfo: User[];
  closeStory: Function;
  user: User;
}) {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<number>(
    userInfo.findIndex((currentUser) => currentUser.id === user.id)
  );

  const userAvatar = userInfo[currentUser]?.avatar;
  const userName = userInfo[currentUser]?.name;
  const currentStoryImage = userInfo[currentUser].images[currentStory]?.image;

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [gestureStateX, setGestureStateX] = useState<number>(0);
  const [gestureStateY, setGestureStateY] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const pauseStory = useCallback(() => {
    setIsPaused(true);
  }, [currentStory]);

  const resumeStory = function () {
    setIsPaused(false);
  };

  const nextUser = () => {
    if (currentUser !== userInfo.length - 1) {
      setCurrentUser((prevState) => prevState + 1);
      setCurrentStory(0);
    } else {
      closeStory();
    }
    setProgress(0);
  };

  const previousUser = () => {
    if (currentUser - 1 >= 0) {
      setCurrentUser((prevState) => prevState - 1);
      setCurrentStory(userInfo[currentUser - 1].images.length - 1);
    }
    setProgress(0);
  };

  const nextStory = () => {
    if (currentStory !== userInfo[currentUser].images.length - 1) {
      setCurrentStory((prevState) => prevState + 1);
    } else {
      nextUser();
    }
    setProgress(0);
  };

  const previousStory = () => {
    if (currentStory - 1 >= 0) {
      setCurrentStory((prevState) => prevState - 1);
    } else {
      previousUser();
    }
    setProgress(0);
  };

  const onGestureEvent = (event: any) => {
    setGestureStateX(event.nativeEvent.translationX);
    setGestureStateY(event.nativeEvent.translationY);
  };

  const onGestureStateChange = (event: any) => {
    const { state } = event.nativeEvent;

    if (state === State.BEGAN || state === State.ACTIVE) {
      pauseStory();
    } else if (state === State.END) {
      resumeStory();

      if (gestureStateY > 45 && Math.abs(gestureStateX) < 60) {
        closeStory();
      } else if (gestureStateY < -200) {
        openBottomSheet();
      } else if (gestureStateX < -60) {
        nextUser();
      } else if (gestureStateX > 60) {
        previousUser();
      }
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <GestureHandlerRootView style={styles.container}>
        <View style={[styles.userProgressContainer]}>
          <LinearGradient
            colors={["rgba(0,0,0,1)", "transparent"]}
            style={styles.linearGradient}
          />
          <View style={styles.separator} />
          <View style={styles.progressBarContainer}>
            {userInfo[currentUser].images.map((_, index) => {
              return (
                <ProgressBar
                  key={index}
                  duration={4}
                  finished={index < currentStory}
                  nextStory={nextStory}
                  isPaused={isPaused}
                  isActive={currentStory === index}
                  progress={progress}
                  setProgress={setProgress}
                />
              );
            })}
          </View>
          <View style={styles.userCloseContainer}>
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{
                    uri: userAvatar,
                  }}
                  style={styles.avatarImage}
                />
              </View>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeStory()}
            >
              <Icon name="x" type="feather" size={30} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
        {currentStoryImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: `${FileSystem.cacheDirectory}${currentStoryImage
                  .split("/")
                  .pop()}`,
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        <View style={styles.controlsContainer}>
          <View style={styles.controls}>
            {/* // esquerda */}
            <View style={styles.control}>
              <TouchableWithoutFeedback
                onPress={() => previousStory()}
                onLongPress={() => pauseStory()}
                onPressOut={() => resumeStory()}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onGestureStateChange}
                  >
                    <View style={{ flex: 1 }} />
                  </PanGestureHandler>
                </GestureHandlerRootView>
              </TouchableWithoutFeedback>
            </View>
            {/* // direita */}
            <View style={styles.control}>
              <TouchableWithoutFeedback
                onPress={() => nextStory()}
                onLongPress={() => pauseStory()}
                onPressOut={() => resumeStory()}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <PanGestureHandler
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onGestureStateChange}
                  >
                    <View style={{ flex: 1 }} />
                  </PanGestureHandler>
                </GestureHandlerRootView>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.seeMore}>
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,1)"]}
              style={styles.seeMoreGradient}
            />
            <Icon name="up" type="antdesign" size={25} color={"#fff"} />
            <Text style={styles.seeMoreText}>Ver Mais</Text>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapTo={"90%"}
          backgroundColor={"white"}
          backDropColor={"black"}
          onOpen={() => setIsPaused(true)}
          onClose={() => setIsPaused(false)}
        ></BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default OpenedStory;

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    height: Dimensions.get("screen").height,
    width: "100%",
    backgroundColor: "#000000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  userProgressContainer: {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    zIndex: 10,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
  },
  separator: {
    width: "100%",
    height: 20,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: Platform.OS === "ios" ? 10 : 0,
    paddingHorizontal: 10,
    height: 30,
    width: "100%",
  },
  userCloseContainer: {
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarContainer: {
    height: 45,
    width: 45,
    padding: 1,
    borderWidth: 2.5,
    borderColor: "darkcyan",
    borderRadius: 100,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
  },
  userName: {
    fontWeight: "500",
    fontSize: 15,
    color: "#fff",
  },
  closeButton: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: "100%",
    zIndex: -10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  controlsContainer: {
    height: Dimensions.get("window").height,
    flexDirection: "column",
    width: "100%",
    zIndex: 9,
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  controls: {
    flex: 1,
    flexDirection: "row",
  },
  control: {
    flex: 1,
    width: "100%",
  },
  seeMore: {
    height: 150,
    width: "100%",
    display: "flex",
    alignItems: "center",
    zIndex: -2,
    position: "absolute",
    bottom: 0,
  },
  seeMoreText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  seeMoreGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
  },
});
