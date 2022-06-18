import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function VerificationSendingSuccessfulScreen() {
  return (
    <View style={styles.container}>
      <Text>VerificationSendingSuccessfulScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGreen,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
