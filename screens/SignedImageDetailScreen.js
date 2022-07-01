import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import { BORDER_RADIUS } from "../constants/design";

const MARGIN = 10;

export default function SignedImageDetailScreen({ navigation, route }) {
  const signedImageData = route.params.signedImageData;
  const { width } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(width);

  useEffect(() => {
    // https://reactnavigation.org/docs/5.x/navigation-prop/#setoptions
    navigation.setOptions({
      title: signedImageData.title,
    });
    // calculate height for image element
    Image.getSize(signedImageData.imageUri, (originalWidth, originalHeight) => {
      const zoomFactor = width / originalWidth;
      setImageHeight(originalHeight * zoomFactor);
    });
    // avoid Error "Can't perform a React state update on an unmounted component."
    // by cleaning up
    // https://stackoverflow.com/a/65007703/13128152
    return () => setImageHeight(width);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false} // disable scrolling effects on all platforms
        bounces={false} // https://reactnative.dev/docs/scrollview#bounces-ios
        overScrollMode={"never"} // https://reactnative.dev/docs/scrollview.html#overscrollmode-android
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: signedImageData.imageUri,
            width: width - 2 * MARGIN,
            height: imageHeight - 2 * MARGIN,
          }}
        />
        <Text>public_key: {signedImageData.public_key}</Text>
        <Text>signature: {signedImageData.signature}</Text>
        <Text>
          qrCodePNGBase64.length: {signedImageData.qrCodePNGBase64.length}
        </Text>
        <Text>imageUri: {signedImageData.imageUri}</Text>
      </ScrollView>
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
  image: {
    margin: MARGIN,
    borderRadius: BORDER_RADIUS,
  },
});
