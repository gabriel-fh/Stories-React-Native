import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

type NavigationControlsProps = {
  previousStory: () => void;
  nextStory: () => void;
  pauseStory: () => void;
  resumeStory: () => void;
  openBottomSheet: () => void;
  onGestureEvent: any;
  onGestureStateChange: any;
};

const NavigationControls = ({
  previousStory,
  nextStory,
  pauseStory,
  resumeStory,
  openBottomSheet,
  onGestureEvent,
  onGestureStateChange,
}: NavigationControlsProps) => {
  return (
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
      <TouchableWithoutFeedback onPress={() => openBottomSheet()}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onGestureStateChange}
          >
            <View style={styles.seeMore}>
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,1)"]}
                style={styles.seeMoreGradient}
              />
              <View style={styles.seeMoreIconText}>
                <Icon name="up" type="antdesign" size={25} color={"#fff"} />
                <Text style={styles.seeMoreText}>Ver Mais</Text>
              </View>
            </View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default NavigationControls;

const styles = StyleSheet.create({
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
    // zIndex: 2,
    // backgroundColor: "green",
  },
  seeMore: {
    height: 150,
    width: "100%",
    display: "flex",
    zIndex: 11,
    position: "absolute",
    bottom: -12,
  },
  seeMoreIconText: {
    alignSelf: "center",
    marginTop: 0,
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
