/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import crypto from "crypto";

const toBinary = (input: string, isBase64 = false) =>
  Uint8Array.from(isBase64 ? atob(input) : input, (c) => c.charCodeAt(0));

export const decrypt = (encrypted: string, passkey: string, iv: string) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    toBinary(passkey),
    toBinary(iv, true)
  );
  const decrypted = decipher.update(encrypted, "base64", "utf8");

  return decrypted + decipher.final("utf8");
};
