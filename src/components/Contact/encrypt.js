import JSEncrypt from "jsencrypt";
import { CONFIG } from "./config";

export const encryptFormData = (data) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(CONFIG.PUBLIC_RSA_KEY);
  const json = JSON.stringify(data);
  return encrypt.encrypt(json);
};
if (!CONFIG.PUBLIC_RSA_KEY || CONFIG.PUBLIC_RSA_KEY.length < 50) {
  throw new Error("Missing or invalid PUBLIC_RSA_KEY in config.js");
}
