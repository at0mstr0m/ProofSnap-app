import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useState } from "react";
import COLORS from "../constants/colors";
import { SHADOW } from "../constants/design";
import ImagePreview from "../components/ImagePreview";
import SignatureData from "../components/SignatureData";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import QRCode from "react-native-qrcode-svg";
import * as MailComposer from "expo-mail-composer";
import { generateComposerOptions } from "../helpers/MailComposerHelper";

export default function SignatureSendingSuccessfulScreen({ route }) {
  const { width, height } = useWindowDimensions();
  const [qrCodePNGBase64, setQRCodePNGBase64] = useState("");
  const result = route.params.result;
  const image = route.params.image;
  const title = route.params.title;

  async function saveQrToDisk(qrData) {
    if (!qrData) return;
    qrData.toDataURL((base64) => {
      setQRCodePNGBase64("data:image/png;base64," + base64);
    });
  }

  async function sendViaMail() {
    // check if sending e-mails is available on the device. Only critical on iOS.
    if (!(await MailComposer.isAvailableAsync())) {
      Alert.alert(
        "E-Mail nicht eingerichtet",
        "Bitte richten Sie einen E-Mail Account auf diesem Gerät ein.",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }
    MailComposer.composeAsync(
      generateComposerOptions(
        title,
        result.public_key,
        result.signature,
        qrCodePNGBase64,
        image.uri
      )
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
        <Text>SendingSuccessfulScreen</Text>
        <Text>Title: {title}</Text>
        <ImagePreview image={image} />
        <SignatureData
          publicKey={result.public_key}
          signature={result.signature}
        />
        <View style={styles.qrCode}>
          <QRCode
            value={JSON.stringify({
              public_key: result.public_key,
              signature: result.signature,
            })}
            size={(width * 3) / 4}
            getRef={saveQrToDisk}
          />
        </View>
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
