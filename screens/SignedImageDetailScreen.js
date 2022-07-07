import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Image,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import {
  BORDER_RADIUS,
  SHADOW,
  SIGNATURE_DATA_PADDING,
} from "../constants/design";
import SignatureData from "../components/SignatureData";
import { parseToDDMMYYYYdashHHMM } from "../helpers/DateHelper";
import { openShareOptions, sendViaMail } from "../helpers/ShareHelper";
import QRCodeContainer from "../components/QRCodeContainer";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";

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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: signedImageData.imageUri,
              width: width - 2 * MARGIN,
              height: imageHeight - 2 * MARGIN,
            }}
          />
        </View>
        <Text style={styles.timeTitle}>Aufnahmezeitpunkt:</Text>
        <Text style={styles.time}>
          {parseToDDMMYYYYdashHHMM(signedImageData.timestamp)}
        </Text>
        <SignatureData
          publicKey={signedImageData.public_key}
          signature={signedImageData.signature}
          timestamp={signedImageData.timestamp}
        />
        {/* <Text>public_key: {signedImageData.public_key}</Text>
        <Text>signature: {signedImageData.signature}</Text>
        <Text>
          qrCodePNGBase64.length: {signedImageData.qrCodePNGBase64.length}
        </Text>
        <Text>imageUri: {signedImageData.imageUri}</Text> */}
        <QRCodeContainer
          style={{
            width: (width * 3) / 4,
            height: (width * 3) / 4,
          }}
        >
          <Image
            source={{
              uri: "data:image/png;base64," + signedImageData.qrCodePNGBase64,
              width: (width * 3) / 4 - SIGNATURE_DATA_PADDING * 2,
              height: (width * 3) / 4 - SIGNATURE_DATA_PADDING * 2,
            }}
          />
        </QRCodeContainer>
        <HomeScreenButtonWhite
          title="Teilen"
          iconName="share"
          onPress={openShareOptions.bind(this, signedImageData.imageUri)}
        />
        <HomeScreenButtonWhite
          iconName="mail"
          onPress={sendViaMail.bind(this, {
            title: signedImageData.title,
            publicKey: signedImageData.public_key,
            signature: signedImageData.signature,
            timestamp: signedImageData.timestamp,
            qrCodePNGBase64: signedImageData.qrCodePNGBase64,
            imageUri: signedImageData.imageUri,
          })}
          title="Per Mail senden"
        />
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
  imageContainer: {
    ...SHADOW,
    margin: MARGIN,
    borderRadius: BORDER_RADIUS,
  },
  image: {
    borderRadius: BORDER_RADIUS,
  },
  title: {
    fontFamily: "Montserrat_900Black",
    fontWeight: "900",
    color: COLORS.buttonText,
    fontSize: 18,
    textAlign: "center",
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
