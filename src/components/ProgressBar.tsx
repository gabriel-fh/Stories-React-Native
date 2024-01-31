import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({
  index,
  duration,
  nextStory,
  isPaused,
  isActive,
  progress,
  setProgress,
  finished,
}: {
  index: number;
  duration: number;
  nextStory: Function;
  isPaused: boolean;
  isActive: boolean;
  progress: number;
  setProgress: Function;
  finished: boolean;
}) => {
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused && isActive) {
      const intervalDuration = 1; // Intervalo de atualização (10ms)

      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - (startTime ? startTime : 0);

        if (elapsedTime < duration * 1000) {
          const newProgress = (elapsedTime / (duration * 1000)) * 100;
          setProgress(newProgress);
        } else {
          clearInterval(interval);
          nextStory();
          setProgress(0);
        }

        // if(resetProgress) {
        //     clearInterval(interval);
        //     setProgress(0)
        // }
      }, intervalDuration);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused, duration, nextStory, startTime]);

  useEffect(() => {
    if (!isPaused) {
      setStartTime(Date.now() - (progress / 100) * (duration * 1000));
    }
  }, [isPaused, progress, duration]);

  return (
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progress,
          { width: `${finished ? "100" : !isActive ? "0" : progress}%` },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: "100%",
    height: 3,
    backgroundColor: "rgba(117, 117, 117, 0.5)",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 2,
    marginTop: 50
  },
  progress: {
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 5,
  },
});

export default ProgressBar;
