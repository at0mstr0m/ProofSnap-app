const QR_DATA_LENGTH = 560;
export const KEY_LENGTH = 264;
// every key must be a hexadecimal number of certain length
const MATCHER = new RegExp(`[0-9a-f]{${KEY_LENGTH}}`);

export function isPossibleKey(key) {
  return MATCHER.test(key);
}

export function verifySignatureData(data) {
  if (data.length !== QR_DATA_LENGTH) return { result: false };
  let unpackedData;
  try {
    unpackedData = JSON.parse(data);
  } catch (error) {
    console.error(error);
    return { result: false };
  }
  const publicKey = unpackedData?.public_key;
  const signature = unpackedData?.signature;
  if (!publicKey || !signature) return { result: false };
  if (isPossibleKey(publicKey) && isPossibleKey(signature))
    return {
      result: true,
      scannedPublicKey: publicKey,
      scannedSignature: signature,
    };
  else return { result: false };
}
