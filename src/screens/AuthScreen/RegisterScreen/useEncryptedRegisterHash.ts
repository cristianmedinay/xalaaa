/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useMemo } from "react";

import { decrypt } from "./decrypt";

interface useEncryptedRegisterHashParams {
  hash: string;
}

interface DecryptedCleengPayload {
  Email: string;
  FirstName: string;
  LastName: string;
  CleengUserID: string;
}

const PASSKEY = process.env.REACT_APP_CLEENG_USER_REGISTRATION_PASSKEY || "";
const IV = process.env.REACT_APP_CLEENG_USER_REGISTRATION_IV || "";

export const useEncryptedRegisterHash = (
  params: useEncryptedRegisterHashParams
) => {
  const { hash } = params;

  const decryptedRegisterData = useMemo((): DecryptedCleengPayload | null => {
    if (!hash) {
      return null;
    }

    try {
      const decryptedData = decrypt(hash, PASSKEY, IV);

      return JSON.parse(decryptedData) as DecryptedCleengPayload;
    } catch (error: any) {
      console.error("Unable to decrypt hash", error);
      return null;
    }
  }, [hash]);

  return {
    decryptedRegisterData,
  };
};
