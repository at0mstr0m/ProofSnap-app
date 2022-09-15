import { StyleSheet, View } from "react-native";
import Title from "../components/Text/Title";
import COLORS from "../constants/colors";
import { Foundation } from "@expo/vector-icons";

// is displayed when the verification returns true
export default function VerificationSendingSuccessfulScreen({ route }) {
  const result = route.params.result;

  return (
    <View style={styles.container}>
      <Title text="Signatur gültig" />
      <View style={styles.icon}>
        <Foundation name="check" size={50} color={COLORS.buttonText} />
      </View>
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
  icon: {
    marginTop: 20,
  },
});
