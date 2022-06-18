import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function SignatureSendingSuccessfulScreen() {
  return (
    <View style={styles.container}>
      <Text>SendingSuccessfulScreen</Text>
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
