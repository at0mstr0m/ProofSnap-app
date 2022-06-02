import {
  StyleSheet,
  Pressable,
  View,
  Text,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const BORDER_RADIUS = 8;

export default function HomeScreenButtonGradient({
  children,
  onPress,
  startColor,
  endColor,
  position,
}) {
  return (
    <View
      style={[
        styles.buttonOuterContainer,
        {
          marginRight: position === "left" ? 10 : 0,
          marginLeft: position === "right" ? 10 : 0,
        },
      ]}
    >
      <LinearGradient
        style={{ borderRadius: BORDER_RADIUS }}
        colors={[startColor, endColor]}
        // https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/180#issuecomment-310675694
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
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
          <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
      </LinearGradient>
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
    flex: 2,
    marginBottom: 10,
  },
  buttonInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BORDER_RADIUS,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.4,
    backgroundColor: Platform.OS === "ios" ? "#C0C0C0" : "transparent",
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
    fontSize: 20,
  },
});
