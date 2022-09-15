import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { BORDER_RADIUS, SHADOW } from "../constants/design";
import { parseToDDMMYYYYdashHHMM } from "../helpers/DateHelper";

// displays a signed image preview
export default function SignedImagesPreview({
  title,
  timestamp,
  imageUri,
  id,
  onPress,
}) {
  const { width } = useWindowDimensions();
  return (
    <Pressable onPress={onPress.bind(this, id)}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={[
          styles.container,
          { width: (width * 3) / 4, height: (((width * 3) / 4) * 2) / 3 },
        ]}
        imageStyle={styles.image} // only necessary because of iOS...
      >
        <LinearGradient
          style={styles.linearGradient}
          colors={[COLORS.greyGradient.start, COLORS.greyGradient.end]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.4, y: 0.7 }}
        >
          <View style={styles.details}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>
              {parseToDDMMYYYYdashHHMM(timestamp)}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    // opacity: 0.7,
    borderRadius: BORDER_RADIUS,
    margin: 10,
  },
  linearGradient: {
    borderRadius: BORDER_RADIUS,
    flex: 1,
  },
  image: {
    borderRadius: BORDER_RADIUS,
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: "white",
    fontSize: 20,
  },
  details: {
    margin: 20,
  },
});
