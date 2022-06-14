import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function SendingScreen({ params }) {
  return (
    <View style={styles.container}>
      <Text>SendingScreen</Text>
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
