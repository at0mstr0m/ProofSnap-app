import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { useState, useContext, useEffect } from "react";
import { SignedImagesContext } from "../context/SignedImagesContext";
import COLORS from "../constants/colors";
import ImagePreview from "../components/ImagePreview";
import SignatureData from "../components/SignatureData";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import QRCode from "react-native-qrcode-svg";
import QRCodeContainer from "../components/QRCodeContainer";
import { openShareOptions, sendViaMail } from "../helpers/ShareHelper";
import PreconfiguredScrollView from "../components/PreconfiguredScrollView";
import ParsedTimestamp from "../components/Text/ParsedTimestamp";
import Title from "../components/Text/Title";

// This screen is displayed when signature was successful.
// Contains all the signature data and the image file and its signature data can directly be shared
export default function SignatureSendingSuccessfulScreen({ route }) {
  const signedImagesContext = useContext(SignedImagesContext);
  const { width } = useWindowDimensions(); // necessary for styling
  const [qrCodePNGBase64, setQRCodePNGBase64] = useState("");
  const response = route.params.result.response;
  const assetUri = route.params.result.assetUri;
  const image = route.params.image; // contains the signed image file
  const title = route.params.title;

  // save QR-Code
  async function extractQRCodePNGBase64(qrData) {
    if (!qrData) return;
    qrData.toDataURL((base64) => {
      setQRCodePNGBase64(base64);
      // setQRCodePNGBase64("data:image/png;base64," + base64);
    });
  }

  // Save signature data on the device using context.
  // Is executed once when this screen is opened.
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
      <PreconfiguredScrollView>
        <ImagePreview image={image} />
        <Title text={title} />
        <ParsedTimestamp timestamp={response.timestamp} />
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
          onPress={openShareOptions.bind(this, image.uri)} // assetUri can cause problems on iOS...
        />
        <HomeScreenButtonWhite
          iconName="mail"
          onPress={sendViaMail.bind(this, {
            title: title,
            publicKey: response.public_key,
            signature: response.signature,
            timestamp: response.timestamp,
            qrCodePNGBase64: qrCodePNGBase64,
            imageUri: image.uri, // assetUri can cause problems on iOS...
          })}
          title="Per Mail senden"
        />
      </PreconfiguredScrollView>
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
