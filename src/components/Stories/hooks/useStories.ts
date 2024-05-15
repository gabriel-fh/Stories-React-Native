import { useState, useRef, useCallback, useEffect } from "react";
import { State } from "react-native-gesture-handler";
import { BottomSheetMethods } from "../../BottomSheet/BottomSheet";
import { useStorage } from "./useStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSeenStories } from "./useSeenStories";

export const useStories = (
  userInfo: User[],
  user: User,
  closeStory: () => void
) => {
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<number>(
    userInfo.findIndex((currentUser) => currentUser.id === user.id)
  );

  const userAvatar = userInfo[currentUser]?.avatar;
  const userName = userInfo[currentUser]?.name;
  const userStories = userInfo[currentUser].images;
  const currentStoryImage = userInfo[currentUser].images[currentStory]?.image;

  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [gestureStateX, setGestureStateX] = useState<number>(0);
  const [gestureStateY, setGestureStateY] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const { getData } = useStorage();
  const [storageData, setStorageData] = useState<StorageData[]>([]);

  const { markStoryAsSeen, verifyStories } = useSeenStories();

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const data = await getData();
        const user = data.find(
          (item) => item.id === userInfo[currentUser].id.toString()
        );
        if (user) {
          if (user.stories.length !== userStories.length) {
            verifyStories({
              userInfo,
              currentUser: currentUser,
              userStories: userInfo[currentUser].images,
            }).then((res) => {
              setCurrentStory(res);
            });
          }
        }
      } catch (err) {
        console.error("Erro ao buscar dados do AsyncStorage", err);
      }
    };
    fetchStorageData();
  }, [currentUser]);

  useEffect(() => {
    const fetchStorageData = async () => {
      try {
        const data = await getData();
        setStorageData(data);
      } catch (err) {
        console.error("Erro ao buscar dados do AsyncStorage", err);
      }
    };
    fetchStorageData();
  }, [currentStory]);

  useEffect(() => {
    markStoryAsSeen({ userInfo, currentUser, userStories, currentStory });
  }, [storageData]);

  const setProgressCallback = useCallback((value: number) => {
    setProgress(value);
  }, []);

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
      verifyStories({
        userInfo,
        currentUser: currentUser + 1,
        userStories: userInfo[currentUser + 1].images,
      }).then((res) => {
        setCurrentUser((prevState) => prevState + 1);
        setCurrentStory(res);
      });
    } else {
      closeStory();
    }
    setProgressCallback(0);
  };

  const previousUser = () => {
    if (currentUser - 1 >= 0) {
      setCurrentUser((prevState) => prevState - 1);
      setCurrentStory(userInfo[currentUser - 1].images.length - 1);
    }
    setProgressCallback(0);
  };

  const nextStory = () => {
    if (currentStory !== userInfo[currentUser].images.length - 1) {
      setCurrentStory((prevState) => prevState + 1);
    } else {
      nextUser();
    }
    setProgressCallback(0);
  };

  const previousStory = () => {
    if (currentStory - 1 >= 0) {
      setCurrentStory((prevState) => prevState - 1);
    } else {
      previousUser();
    }
    setProgressCallback(0);
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

  return {
    userAvatar,
    userName,
    currentStoryImage,
    isPaused,
    progress,
    bottomSheetRef,
    currentStory,
    userStories,
    nextStory,
    previousStory,
    setIsPaused,
    pauseStory,
    resumeStory,
    setProgress: setProgressCallback,
    onGestureEvent,
    onGestureStateChange,
    openBottomSheet,
  };
};
