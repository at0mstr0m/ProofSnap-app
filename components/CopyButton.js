import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { SHADOW } from "../constants/design";
import COLORS from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CopyButton({ onPress }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Text style={styles.text}>Kopieren</Text>
        <MaterialCommunityIcons name="content-copy" size={20} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.element,
    alignItems: "center",
    justifyContent: "center",
  },
  pressable: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: "white",
    marginRight: 4,
  },
});
