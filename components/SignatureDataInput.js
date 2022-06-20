import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Platform,
} from "react-native";
import COLORS from "../constants/colors";
import { SHADOW, BORDER_RADIUS } from "../constants/design";
import PasteButton from "./PasteButton";
import * as Clipboard from "expo-clipboard";

const MARGIN = 12;
const PUBLIC_KEY_LENGTH = 264;
const SIGNATURE_LENGTH = PUBLIC_KEY_LENGTH;

export default function SignatureDataInput({
  publicKey,
  setPublicKey,
  signature,
  setSignature,
}) {
  const { width, height } = useWindowDimensions();

  function publicKeyInputHandler(enteredText) {
    setPublicKey(enteredText);
  }

  function signatureInputHandler(enteredText) {
    setSignature(enteredText);
  }

  async function pasteFromClipboard() {
    const clipboardText = await Clipboard.getStringAsync();
    let signatureData;
    try {
      // parse object from Clipboard
      signatureData = JSON.parse(clipboardText);
      // only fill TextInput fields if the keys hav a valid length and
      // contain only hexadecimal characters 0-9 and a-f
      if (
        signatureData?.public_key.length === PUBLIC_KEY_LENGTH &&
        signatureData?.signature.length === SIGNATURE_LENGTH
      ) {
        setPublicKey(signatureData.public_key);
        setSignature(signatureData.signature);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={[styles.container, { width: (width * 3) / 4 }]}>
      <View style={styles.topContainer}>
        <Text style={[styles.title, { marginTop: MARGIN * 2 }]}>
          PUBLIC KEY
        </Text>
        <PasteButton onPress={pasteFromClipboard} />
      </View>
      <View style={[styles.inputContainer, { marginBottom: 0 }]}>
        <TextInput
          style={styles.text}
          numberOfLines={1}
          placeholder="PUBLIC KEY"
          placeholderTextColor={COLORS.header}
          maxLength={PUBLIC_KEY_LENGTH}
          onChangeText={publicKeyInputHandler}
          value={publicKey}
        />
      </View>
      <Text style={styles.title}>SIGNATUR</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.text}
          numberOfLines={1}
          placeholder="SIGNATUR"
          placeholderTextColor={COLORS.header}
          maxLength={SIGNATURE_LENGTH}
          onChangeText={signatureInputHandler}
          value={signature}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...SHADOW,
    backgroundColor: COLORS.element,
    borderRadius: BORDER_RADIUS,
    margin: MARGIN,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Montserrat_400Regular",
    fontWeight: "900",
    marginBottom: MARGIN / 2,
    color: "white",
    marginLeft: MARGIN,
    marginTop: MARGIN,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: BORDER_RADIUS,
    padding: Platform.OS === "android" ? MARGIN / 4 : (MARGIN * 3) / 4, // on iOS a TextInput has a different height...
    paddingLeft: (MARGIN * 3) / 4,
    paddingRight: (MARGIN * 3) / 4,
    margin: MARGIN,
    marginTop: 0,
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    color: COLORS.element,
  },
});
