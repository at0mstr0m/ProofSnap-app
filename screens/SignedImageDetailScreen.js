import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Image,
  Alert,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import COLORS from "../constants/colors";
import {
  BORDER_RADIUS,
  SHADOW,
  SIGNATURE_DATA_PADDING,
} from "../constants/design";
import SignatureData from "../components/SignatureData";
import { openShareOptions, sendViaMail } from "../helpers/ShareHelper";
import QRCodeContainer from "../components/QRCodeContainer";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import ParsedTimestamp from "../components/Text/ParsedTimestamp";
import Title from "../components/Text/Title";
import { SignedImagesContext } from "../context/SignedImagesContext";

const MARGIN = 10;

// displays all available Info about the signed image
export default function SignedImageDetailScreen({ navigation, route }) {
  const signedImagesContext = useContext(SignedImagesContext);
  const signedImageData = route.params.signedImageData;
  const { width } = useWindowDimensions(); // necessary for styling
  const [imageHeight, setImageHeight] = useState(width); // necessary for styling

  useEffect(() => {
    // sets the image title in the navigation bar
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

  // handles deleting the image data
  function handleDelete() {
    Alert.alert(
      "Löschen",
      "Das Foto wird nur aus der Liste gelöscht, es bleibt weiterhin auf diesem Gerät gespeichert und bleibt auch weiterhin verifizierbar.",
      [
        {
          text: "Verstanden",
          style: "default",
          onPress: () => {
            signedImagesContext.removeSignedImage(signedImageData.id);
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeScreen" }],
            });
          },
        },
        { text: "Abbrechen", style: "destructive" },
      ]
    );
  }

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
        <Title text={signedImageData.title} />
        <ParsedTimestamp timestamp={signedImageData.timestamp} />
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
        <HomeScreenButtonWhite
          title="Löschen"
          iconName="delete"
          onPress={handleDelete}
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
