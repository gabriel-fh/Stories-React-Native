import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Stories from "./src/components/Stories/Stories";
import BottomSheet, {
  BottomSheetMethods,
} from "./src/components/BottomSheet/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSheet() {
    setIsOpen((prevState) => !prevState);
  }

  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  return (
    <View style={styles.container}>
      <Stories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});
