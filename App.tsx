import { View, StyleSheet } from "react-native";
import Stories from "./src/components/Stories/Stories";

import React from "react";

export default function App() {

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
