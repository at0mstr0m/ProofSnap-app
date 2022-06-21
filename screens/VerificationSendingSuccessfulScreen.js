import { StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";

export default function VerificationSendingSuccessfulScreen({ route }) {
  const result = route.params.result;

  return (
    <View style={styles.container}>
      <Text>VerificationSendingSuccessfulScreen</Text>
      <Text>Result: {result}</Text>
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
