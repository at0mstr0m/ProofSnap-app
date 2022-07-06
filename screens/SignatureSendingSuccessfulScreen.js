import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Platform
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { SignedImagesContext } from "../context/SignedImagesContext";
import COLORS from "../constants/colors";
import ImagePreview from "../components/ImagePreview";
import SignatureData from "../components/SignatureData";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import QRCode from "react-native-qrcode-svg";
import QRCodeContainer from "../components/QRCodeContainer";
import { openShareOptions, sendViaMail } from "../helpers/ShareHelper";

export default function SignatureSendingSuccessfulScreen({ route }) {
  const signedImagesContext = useContext(SignedImagesContext);
  const { width } = useWindowDimensions();
  const [qrCodePNGBase64, setQRCodePNGBase64] = useState("");
  const response = route.params.result.response;
  const assetUri = route.params.result.assetUri;
  const image = route.params.image;
  const title = route.params.title;

  async function extractQRCodePNGBase64(qrData) {
    if (!qrData) return;
    qrData.toDataURL((base64) => {
      setQRCodePNGBase64(base64);
      // setQRCodePNGBase64("data:image/png;base64," + base64);
    });
  }

  useEffect(() => {
    if (qrCodePNGBase64) {
      signedImagesContext.addSignedImage({
        title: title,
        public_key: response.public_key,
        signature: response.signature,
        timestamp: response.timestamp,
        qrCodePNGBase64: qrCodePNGBase64,
        imageUri: assetUri,
      });
    }
  }, [qrCodePNGBase64]);

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
        <Text>SendingSuccessfulScreen</Text>
        <Text>Title: {title}</Text>
        <ImagePreview image={image} />
        <SignatureData
          publicKey={response.public_key}
          signature={response.signature}
          timestamp={response.timestamp}
        />
        <QRCodeContainer style={styles.qrCodeContainer}>
          <QRCode
            value={JSON.stringify({
              public_key: response.public_key,
              signature: response.signature,
              timestamp: response.timestamp,
            })}
            size={(width * 3) / 4 - 2 * 10}
            getRef={extractQRCodePNGBase64}
          />
        </QRCodeContainer>
        <HomeScreenButtonWhite
          title="Teilen"
          iconName="share"
          onPress={openShareOptions.bind(this, image.uri)} // should not matter if assetUri or image.uri is used, but come what may image.uri should definitely be working
        />
        <HomeScreenButtonWhite
          iconName="mail"
          onPress={sendViaMail.bind(this, {
            title: title,
            publicKey: response.public_key,
            signature: response.signature,
            timestamp: response.timestamp,
            qrCodePNGBase64: qrCodePNGBase64,
            imageUri: image.uri, // should not matter if assetUri or image.uri is used, but come what may image.uri should definitely be working
          })}
          title="Per Mail senden"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundGreen,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrCodeContainer: {
    marginBottom: 20,
  },
});
