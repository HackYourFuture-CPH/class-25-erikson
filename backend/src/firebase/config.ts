
import * as admin from "firebase-admin";
import { readFileSync } from "fs";
import { resolve } from "path";

const ADMIN_FIRE_CONFIG = readFileSync(
  resolve("./src/config/firebase-admin-sdk.json"),
  "utf-8"
);

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(ADMIN_FIRE_CONFIG)),
});

export const adminFireAuth = adminApp.auth();