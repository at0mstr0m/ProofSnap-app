import { StyleSheet, View } from "react-native";
import Title from "../components/Text/Title";
import COLORS from "../constants/colors";
import { Foundation } from "@expo/vector-icons";

export default function VerificationSendingFailedScreen() {
  return (
    <View style={styles.container}>
      <Title text="Signatur ungültig" />
      <View style={styles.icon}>
        <Foundation name="x" size={50} color={COLORS.buttonText} />
      </View>
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
  icon: {
    marginTop: 20,
  },
});
