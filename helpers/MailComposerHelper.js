import * as FileSystem from "expo-file-system";
// import * as MediaLibrary from "expo-media-library";

export async function generateComposerOptions(
  title,
  publicKey,
  signature,
  timestamp,
  qrCodePNGBase64,
  imageUri
) {
  const html = `
  <!DOCTYPE html>
  <html lang="de">
  
  <head>
      <meta charset="utf-8">
  </head>
  
  <body>
      <p>Hallo!</p>
      <p>Ich habe grade dieses Bild mit ProofSnap signiert.<br></p>
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
  return {
    // body: `Ich habe grade dieses Bild mit Proof Snap signiert!/npublicKey: ${publicKey}/nsignature: ${signature}/n <img src="${qrCodePNGBase64}" alt="Red dot" />`,
    body: html,
    isHtml: true,
    subject: `ProofSnap Signatur von ${title}`,
    attachments: [imageUri, qrImageUri],
  };
}
