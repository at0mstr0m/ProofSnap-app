import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Alert,
  Button,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { SignedImagesContext } from "../context/SignedImagesContext";
import COLORS from "../constants/colors";
import { SHADOW } from "../constants/design";
import ImagePreview from "../components/ImagePreview";
import SignatureData from "../components/SignatureData";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import QRCode from "react-native-qrcode-svg";
import * as MailComposer from "expo-mail-composer";
import { generateComposerOptions } from "../helpers/MailComposerHelper";
import * as Sharing from "expo-sharing";

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

  async function sendViaMail() {
    // Check if sending e-mails is available on the device. Only relevant on iOS.
    if (!(await MailComposer.isAvailableAsync())) {
      Alert.alert(
        "E-Mail nicht eingerichtet",
        "Bitte richten Sie einen E-Mail Account auf diesem Gerät ein.",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }
    // open Mail composer
    MailComposer.composeAsync(
      await generateComposerOptions(
        title,
        response.public_key,
        response.signature,
        response.timestamp,
        qrCodePNGBase64,
        // should not matter if assetUri or image.uri is used, but come what may image.uri should definitely be working
        image.uri
      )
    );
  }

  async function share() {
    // check if sharing is available on the current device
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(
        "Teilen auf diesem Gerät nicht verfügbar.",
        'Bitte versuchen sie die Funktion "Per Mail senden"',
        [{ text: "OK", style: "destructive" }]
      );
      // abort if sharing is not available on the current device
      return;
    }
    // draw users attention to problems with compression and
    Alert.alert(
      "Wichtiger Hinweis.",
      "Das Teilen dieses Bildes auf z.B. WhatsApp ist zwar möglich, jedoch wird hierbei die Bilddatei durch Kompression verändert und ist danach nicht mehr mit ProofSnap verifizierbar! ",
      [
        {
          text: "Verstanden",
          style: "default",
          onPress: () =>
            Sharing.shareAsync(
              // should not matter if assetUri or image.uri is used, but come what may image.uri should definitely be working
              image.uri,
              {
                // only used by iOS
                // https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html
                UTI: "public.image",
                // only used by Android
                // https://stackoverflow.com/a/27550058/13128152
                mimeType: "image/jpg",
              }
            ),
        },
        { text: "Abbrechen", style: "destructive" },
      ]
    );
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
        <View style={styles.qrCode}>
          <QRCode
            value={JSON.stringify({
              public_key: response.public_key,
              signature: response.signature,
              timestamp: response.timestamp,
            })}
            size={(width * 3) / 4}
            getRef={extractQRCodePNGBase64}
          />
        </View>
        <HomeScreenButtonWhite
          title="Teilen"
          iconName="share"
          onPress={share}
        />
        <HomeScreenButtonWhite
          iconName="mail"
          onPress={sendViaMail}
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
  qrCode: {
    ...SHADOW,
    marginBottom: 20,
  },
});
