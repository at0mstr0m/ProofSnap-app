export function generateComposerOptions(
  title,
  publicKey,
  signature,
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
      <p>Ich habe grade dieses Bild mit Proof Snap signiert.<br></p>
      <p>Öffentlicher Schlüssel: ${publicKey}<br></p>
      <p>Signatur: ${signature}<br></p>
      </p>
      <img src="${qrCodePNGBase64}" alt="qrcode" width="300" height="300" data-image-whitelisted style="display:block"/>
  </body>
  
  </html>
  `;
  return {
    // body: `Ich habe grade dieses Bild mit Proof Snap signiert!/npublicKey: ${publicKey}/nsignature: ${signature}/n <img src="${qrCodePNGBase64}" alt="Red dot" />`,
    body: html,
    isHtml: true,
    subject: `ProofSnap Signatur von ${title}`,
    attachments: [imageUri],
  };
}
