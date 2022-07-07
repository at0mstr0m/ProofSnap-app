import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export default function Title({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Montserrat_900Black",
    color: COLORS.buttonText,
    fontSize: 23,
    textAlign: "center",
  },
});
