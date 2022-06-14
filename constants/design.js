import { Platform } from "react-native";

// Views cast a very similar shadow on all devices
export const SHADOW = {
  overflow: Platform.OS === "android" ? "hidden" : null,
  elevation: 8,
  shadowColor: "#000000",
  shadowOffset: { width: 1, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
};

export const BORDER_RADIUS = 8;
export const ICON_SIZE = 30;
