import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function SendingFailedScreen({ params }) {
  return (
    <View style={styles.container}>
      <Text>SendingFailedScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundRed,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
