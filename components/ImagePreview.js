import {
  StyleSheet,
  Image,
  useWindowDimensions,
  View,
  Pressable,
} from "react-native";
import { SHADOW, BORDER_RADIUS } from "../constants/design";
import { calculateImageDimensions } from "../helpers/ImageHelper";

export default function ImagePreview({ image, method, onPress }) {
  const { width, height } = useWindowDimensions();
  const { imageWidth, imageHeight } = calculateImageDimensions(
    width,
    image,
    method
  );
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Image
          style={styles.image}
          source={{
            uri: image.uri,
            width: imageWidth,
            height: imageHeight,
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    margin: 15,
    borderRadius: BORDER_RADIUS,
  },
  image: {
    borderRadius: BORDER_RADIUS,
  },
});
