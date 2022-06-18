import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function SignatureSendingFailedScreen() {
  return (
    <View style={styles.container}>
      <Text>SignatureSendingFailedScreen</Text>
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
