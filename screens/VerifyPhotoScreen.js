import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function VerifyPhotoScreen({ params }) {
  return (
    <View style={styles.container}>
      <Text>VerifyPhotoScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
