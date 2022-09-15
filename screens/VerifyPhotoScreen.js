import { useState } from "react";
import {
  StyleSheet,
  View,
  Platform,
  useWindowDimensions,
  Pressable,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import ImagePreview from "../components/ImagePreview";
import ImagePreviewPlaceholder from "../components/ImagePreviewPlaceholder";
import HomeScreenButtonWhite from "../components/Buttons/HomeScreenButtonWhite";
import SignatureDataInput from "../components/SignatureDataInput";
import { requestPermissionsAsync } from "expo-media-library";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  isPossibleKey,
  isPossibleTimestamp,
  verifySignatureData,
} from "../helpers/SignatureDataVerificationHelper";
import PreconfiguredKeyboardAwareScrollView from "../components/PreconfiguredKeyboardAwareScrollView";

// This screen leads the user through the process of verifying an image
export default function VerifyPhotoScreen({ navigation }) {
  const [image, setImage] = useState(null); // stores the captured image
  const [publicKey, setPublicKey] = useState(""); // signature data
  const [signature, setSignature] = useState(""); // signature data
  const [timestamp, setTimestamp] = useState(""); // signature data
  const [scannerActivated, setScannerActivated] = useState(false); // necessary to decide if the qr code scanner is opened
  const [scanned, setScanned] = useState(false); // true if scanning a qr code was successful
  const { width, height } = useWindowDimensions(); // screen width & height is used for styling

  // handles image selection
  async function selectImage() {
    // Permission to use the phones media library is necessary
    // and will be requested from user if not yet granted.
    const mediaLibraryPermissionResponse = await requestPermissionsAsync();
    if (!mediaLibraryPermissionResponse.granted) {
      console.error("permission not granted");
      return;
    }
    // user must select an image from image library
    const newImage = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
      exif: true,
    });
    if (newImage.cancelled) return;
    // console.log("newImage.exif", newImage.exif);
    // width and height are confused on iOS, so they have to be switched
    if (Platform.OS === "ios") {
      let height = newImage.height;
      newImage.height = newImage.width;
      newImage.width = height;
    }
    setImage(newImage);
  }

  function openQRCodeScanner() {
    setScannerActivated(true);
  }

  // init sending image and signature data to the backend
  async function initVerification() {
    // must have an image loaded
    if (!image) {
      Alert.alert(
        "Foto fehlt",
        "Bitte wählen Sie ein Foto zum verifizieren aus.",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }
    // signature Data must be entered
    if (!publicKey || !signature || !timestamp) {
      Alert.alert(
        "Signaturdaten unvollständig",
        "Bitte geben Sie die Signaturdaten ein.",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }
    // signature Data must be plausible
    if (
      !isPossibleKey(publicKey) ||
      !isPossibleKey(signature) ||
      !isPossibleTimestamp(timestamp)
    ) {
      Alert.alert(
        "Signaturdaten unvollständig",
        "Die eingegebenen Signaturdaten sind unvollständig.",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }
    // Hand over image and signature data to VerificationSendingScreen
    // without the possibility to go back.
    // By this the verification process cannot be started multiple times.
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "VerificationSendingScreen",
          params: {
            image: image,
            publicKey: publicKey,
            signature: signature,
            timestamp: timestamp,
          },
        },
      ],
    });
  }

  function handleBarCodeScanned({ data }) {
    setScanned(true); // avoids rendering errors
    const qrVerificationResult = verifySignatureData(data);
    if (!qrVerificationResult.result) {
      Alert.alert(
        "Unbrauchbarer QR Code",
        "Der gescannte QR Code enthält leider keine verwendbaren Informationen.",
        [{ text: "OK", style: "destructive" }]
      );
    }
    // put scanned data into the TextInputs
    setPublicKey(qrVerificationResult.scannedPublicKey);
    setSignature(qrVerificationResult.scannedSignature);
    setTimestamp(qrVerificationResult.scannedTimestamp);
    setScanned(false);
    setScannerActivated(false);
  }

  const imagePreview =
    !image || image.cancelled === true ? (
      <ImagePreviewPlaceholder onPress={selectImage} />
    ) : (
      <ImagePreview image={image} method="verify" onPress={selectImage} />
    );

  // renders button or qr code scanner
  const buttonOrScanner = scannerActivated ? (
    <Pressable onPress={() => setScannerActivated(false)}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          width: (width * 3) / 4,
          height: (height * 3) / 4,
        }}
        // only accept QR Codes
        // https://docs.expo.dev/versions/v45.0.0/sdk/bar-code-scanner/#barcodetypes
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
    </Pressable>
  ) : (
    <HomeScreenButtonWhite
      onPress={openQRCodeScanner}
      iconName="qr"
      title="QR-Code scannen"
    />
  );

  return (
    <View style={styles.container}>
      <PreconfiguredKeyboardAwareScrollView style={styles.scrollView}>
        {imagePreview}
        {buttonOrScanner}
        <SignatureDataInput
          publicKey={publicKey}
          setPublicKey={setPublicKey}
          signature={signature}
          setSignature={setSignature}
          timestamp={timestamp}
          setTimestamp={setTimestamp}
        />
        <HomeScreenButtonWhite
          onPress={initVerification}
          iconName="check"
          title="Verifizieren"
          style={styles.button}
        />
      </PreconfiguredKeyboardAwareScrollView>
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
  scrollView: {
    alignItems: "center",
  },
  image: {
    // marginBottom: 50,
  },
  button: {
    marginBottom: 20,
  },
});
