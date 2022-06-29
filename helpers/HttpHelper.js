import axios from "axios";

const BACKEND_IP = "http://192.168.188.40:1337";
const REQUEST_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
};

export async function signHashes(sha256Hash, sha512Hash) {
  const payload = new FormData();
  payload.append("user_id", "yxc321yxc");
  payload.append("sha256Hash", sha256Hash);
  payload.append("sha512Hash", sha512Hash);
  let response;
  /*
    ****** just the same POST request using the fetch API ******

    const response = await fetch("http://192.168.188.40:1337/sign", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: payload,
    });
    console.log(JSON.stringify(response));
    */
  try {
    response = await axios.post(`${BACKEND_IP}/sign`, payload, REQUEST_CONFIG);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response;
}

export async function verifyHashes(
  sha256Hash,
  sha512Hash,
  publicKey,
  signature
) {
  const payload = new FormData();
  payload.append("user_id", "yxc321yxc");
  payload.append("sha256Hash", sha256Hash);
  payload.append("sha512Hash", sha512Hash);
  payload.append("publicKey", publicKey);
  payload.append("signature", signature);
  let response;
  try {
    response = await axios.post(`${BACKEND_IP}/check`, payload, REQUEST_CONFIG);
  } catch (error) {
    console.error(error);
  }
  return response;
}
