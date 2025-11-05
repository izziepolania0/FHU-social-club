import { Account, Client, Databases, ID } from "appwrite";

export const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = "68f8ec9800385106a81d";

export const DB_ID = "690a8ea6000d6e3edbac";
export const EVENTS_COLLECTION_ID = "public_events";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
export default client;
