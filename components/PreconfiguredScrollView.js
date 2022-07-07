import { StyleSheet, ScrollView } from "react-native";

export default function PreconfiguredScrollView({ children }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false} // disable scrolling effects on all platforms
      bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
      overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
      contentContainerStyle={styles.contentContainerStyle}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: "center",
  },
});
