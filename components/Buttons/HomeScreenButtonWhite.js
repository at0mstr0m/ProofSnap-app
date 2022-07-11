import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { SHADOW, BORDER_RADIUS, ICON_SIZE } from "../../constants/design";

export default function HomeScreenButtonWhite({
  title,
  onPress,
  iconName,
  style,
}) {
  const { width } = useWindowDimensions();
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
    case "qr":
      icon = (
        <MaterialCommunityIcons
          name="qrcode"
          size={ICON_SIZE}
          color={COLORS.buttonText}
        />
      );
      break;
    case "mail":
      icon = (
        <MaterialIcons
          name="email"
          size={ICON_SIZE}
          color={COLORS.buttonText}
        />
      );
      break;
    case "share":
      icon = (
        <Ionicons
          name="ios-share-social"
          size={ICON_SIZE}
          color={COLORS.buttonText}
        />
      );
      break;
    case "delete":
      icon = (
        <Ionicons name="md-trash" size={ICON_SIZE} color={COLORS.buttonText} />
      );
      break;
    default:
      icon = (
        <AntDesign name="frown" size={ICON_SIZE} color={COLORS.buttonText} />
      );
      break;
  }

  return (
    <View
      style={[styles.buttonOuterContainer, { width: (width * 3) / 4 }, style]}
    >
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
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    ...SHADOW,
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
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
