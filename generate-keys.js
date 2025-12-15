import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

writeFileSync("private.pem", privateKey);
writeFileSync("public.pem", publicKey);

console.log("✅ RSA key pair generated successfully!");
