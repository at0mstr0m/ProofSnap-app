import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import COLORS from "../constants/colors";

const BORDER_RADIUS = 8;
const ICON_SIZE = 30;

export default function HomeScreenButtonWhite({ children, onPress, iconName }) {
  const { width, height } = useWindowDimensions();
  let icon;
  switch (iconName) {
    case "camera":
      icon = (
        <Foundation name="camera" size={ICON_SIZE} color={COLORS.buttonText} />
      );
      break;
    case "check":
      icon = (
        <Foundation name="check" size={ICON_SIZE} color={COLORS.buttonText} />
      );
      break;
    case "photo":
      icon = (
        <Foundation name="photo" size={ICON_SIZE} color={COLORS.buttonText} />
      );
      break;
    case "send":
      icon = (
        <Foundation
          name="arrow-right"
          size={ICON_SIZE}
          color={COLORS.buttonText}
        />
      );
      break;
    default:
      icon = null;
      break;
  }

  return (
    <View style={[styles.buttonOuterContainer, { minWidth: (width * 3) / 4 }]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: "grey" }}
      >
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    overflow: Platform.OS === "android" ? "hidden" : null,
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin: 10,
  },
  buttonInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "flex-start",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Platform.OS === "ios" ? "#C0C0C0" : "transparent",
  },
  iconContainer: {
    paddingRight: 18,
    paddingLeft: 18,
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 12,
    color: COLORS.buttonText,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
  },
});
