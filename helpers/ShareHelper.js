import { Alert, Platform } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
// import * as MediaLibrary from "expo-media-library";

async function generateComposerOptions({
  title,
  publicKey,
  signature,
  timestamp,
  qrCodePNGBase64,
  imageUri,
}) {
  const html = `
  <!DOCTYPE html>
  <html lang="de">
  
  <head>
      <meta charset="utf-8">
  </head>
  
  <body>
      <p>Hallo!</p>
      <p>Ich habe gerade dieses Bild mit ProofSnap signiert.<br></p>
      <p>Öffentlicher Schlüssel: ${publicKey}<br></p>
      <p>Signatur: ${signature}<br></p>
      <p>Zeitstempel: ${timestamp}<br></p>
      </p>
  </body>
  
  </html>
  `;
  // https://stackoverflow.com/a/63308035
  const qrImageUri =
    FileSystem.documentDirectory +
    `qr-code-${Math.floor(Math.random() * 9999999)}.png`; // add random number to filename
  await FileSystem.writeAsStringAsync(qrImageUri, qrCodePNGBase64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  // await MediaLibrary.saveToLibraryAsync(qrImageUri); // needed to save qr code to camera roll

  // Needed on SignedImageDetailScreen on iOS, because expo-sharing does not accept URIs starting with "ph://".
  // As a workaround a local copy is made
  if (imageUri.startsWith("ph://") || imageUri.startsWith("file:///storage/")) {
    const newImageUri =
      FileSystem.documentDirectory +
      `image-${Math.floor(Math.random() * 9999999)}.jpg`; // add random number to filename
    await FileSystem.copyAsync({ from: imageUri, to: newImageUri });
    imageUri = newImageUri;
  }
  return {
    // body: `Ich habe grade dieses Bild mit Proof Snap signiert!/npublicKey: ${publicKey}/nsignature: ${signature}/n <img src="${qrCodePNGBase64}" alt="Red dot" />`,
    body: html,
    isHtml: true,
    subject: `ProofSnap Signatur von ${title}`,
    attachments: [imageUri, qrImageUri],
  };
}

export async function sendViaMail(composerOptions) {
  // Check if sending e-mails is available on the device. Only relevant on iOS.
  if (!(await MailComposer.isAvailableAsync())) {
    Alert.alert(
      "E-Mail nicht eingerichtet",
      "Bitte richten Sie einen E-Mail Account auf diesem Gerät ein.",
      [{ text: "OK", style: "destructive" }]
    );
    return;
  }
  // prepare ComposerOptions
  const options = await generateComposerOptions(composerOptions);
  // open MailComposer
  MailComposer.composeAsync(options);
}

export async function openShareOptions(imageUri) {
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
  // Needed on SignedImageDetailScreen on iOS, because expo-sharing does not accept URIs starting with "ph://".
  // As a workaround a local copy is made
  if (imageUri.startsWith("ph://")) {
    const newImageUri =
      FileSystem.documentDirectory +
      `image-${Math.floor(Math.random() * 9999999)}.jpg`; // add random number to filename
    // create sharable copy
    await FileSystem.copyAsync({ from: imageUri, to: newImageUri });
    imageUri = newImageUri;
  }
  // draw users attention to problems with compression
  Alert.alert(
    "Wichtiger Hinweis.",
    "Das Teilen dieses Bildes auf z.B. WhatsApp ist zwar möglich, jedoch wird hierbei die Bilddatei durch Kompression verändert und ist danach nicht mehr mit ProofSnap verifizierbar!",
    [
      {
        text: "Verstanden",
        style: "default",
        onPress: () =>
          Sharing.shareAsync(imageUri, {
            // only used by iOS
            // https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html
            UTI: "public.image",
            // only used by Android
            // https://stackoverflow.com/a/27550058/13128152
            mimeType: "image/jpg",
          }),
      },
      { text: "Abbrechen", style: "destructive" },
    ]
  );
}
