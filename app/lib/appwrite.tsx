import { Account, Client } from "appwrite";

export const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io/v1";
export const APPWRITE_PROJECT_ID = "68f8ec9800385106a81d";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export default client;
