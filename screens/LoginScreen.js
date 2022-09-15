import { StyleSheet, View, Text } from "react-native";
import Title from "../components/Text/Title";
import COLORS from "../constants/colors";

// a placeholding screen for a login feature
export default function Login() {
  return (
    <View style={styles.container}>
      <Title text="Hier könnte eine Loginfunktion nachträglich implementiert werden..." />
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
