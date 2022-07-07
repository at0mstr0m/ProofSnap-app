import { View, Text, StyleSheet } from "react-native";
import { parseToDDMMYYYYdashHHMM } from "../../helpers/DateHelper";
import COLORS from "../../constants/colors";

export default function ParsedTimestamp({ timestamp }) {
  return (
    <View style={styles.container}>
      <Text style={styles.timeTitle}>Signiert am:</Text>
      <Text style={styles.time}>{parseToDDMMYYYYdashHHMM(timestamp)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeTitle: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.buttonText,
    fontSize: 20,
    textAlign: "center",
  },
  time: {
    fontFamily: "Montserrat_900Black",
    color: COLORS.buttonText,
    fontSize: 23,
    textAlign: "center",
  },
});
