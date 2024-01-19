import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  Easing,
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
  const [currentStory, setCurrentStory] = useState<number>(0); // armazena o index do story atual
  const [currentUser, setCurrentUser] = useState<number>( // armazena o index do usuario atual
    userInfo.findIndex(
      (currentUserInfo) => currentUserInfo.user_id === user.user_id // busca o index do usuario atual dentro do array de usuarios
    )
  );

  const progress = new Animated.Value(0); // barra de progresso do stories
  const [shouldResetProgress, setShouldResetProgress] = useState<boolean>(false);

  const controlProgress = () => {
    if (currentStory < userInfo[currentUser].stories.length - 1) {
      // Se houver mais stories vai pro próximo
      setCurrentStory((prevState) => prevState + 1);
    } else if (currentUser < userInfo.length - 1) {
      // Se não houver mais stories muda de usuarios
      setCurrentStory(0);
      setCurrentUser((prevState) => prevState + 1);
    } else {
      // se não houver mais stories nem usuários termina
      closeStory();
    }
    // Redefina o valor da barra de progresso para 0
    progress.setValue(0);
  };

  useEffect(() => {
    if (shouldResetProgress) {
      progress.setValue(0);
      setShouldResetProgress(false); // rdefine shouldResetProgress para false
    }
  
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        controlProgress();
      console.log("Progressbar - Current User : " + currentUser + "\nProgressbar - Current Story: " + currentStory);

      }
    });
  }, [currentStory, currentUser, shouldResetProgress]);
  

  const nextStory = () => {
    if (currentStory !== userInfo[currentUser].stories.length - 1) {
      setCurrentStory((prevState) => prevState + 1);
    } else {
      if (currentUser !== userInfo.length - 1) {
        setCurrentUser((prevState) => prevState + 1);
        setCurrentStory(0);
        setShouldResetProgress(true); // configura shouldResetProgress como true
        console.log("Próximo usuário");
      } else {
        closeStory();
      }
    }
    
  };
  const previousStory = () => {
    if (currentStory - 1 >= 0) {
      setCurrentStory((prevState) => prevState - 1);
    } else {
      if (currentUser - 1 >= 0) {
        setCurrentUser((prevState) => prevState - 1);
        setCurrentStory(userInfo[currentUser - 1].stories.length - 1);
        progress.setValue(0);
      } else {
        closeStory();
      }
    }
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
          backgroundColor: "#fff",
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
          <View style={{ marginBottom: 15 }}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
            >
              {userInfo[currentUser].stories.map((story, key) => {
                const widthInterpolation = progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                  extrapolate: "clamp",
                });

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
                    <Animated.View
                      style={{
                        height: 3,
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        width: key === currentStory ? widthInterpolation : 0,
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
            <TouchableOpacity
              style={{ zIndex: 10 }}
              onPress={() => closeStory()}
            >
              <Text style={{ color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          source={userInfo[currentUser].stories[currentStory]?.story_image}
          style={{ height: "100%", width: "100%" }}
          resizeMode="cover"
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: "90%",
            width: "100%",
            zIndex: 999,
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableWithoutFeedback onPress={() => previousStory()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => nextStory()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
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
