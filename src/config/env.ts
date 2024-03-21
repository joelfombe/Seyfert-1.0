import dotenv from "dotenv";
dotenv.config();

const FROM_PHONE_NUMBER_ID = process.env.FROM_PHONE_NUMBER_ID;
const TOKEN = process.env.TOKEN_WHATSAPP;
const VERSION = process.env.WHATSAPP_VERSION;
const BIBLE = process.env.BIBLE_API;
const WHATSAPP_NUMBER = process.env.SEND_TO;
const GEMINI_API_KEY: string = process.env.GEMINI_API_KEY!;

export { FROM_PHONE_NUMBER_ID, TOKEN, VERSION, BIBLE, WHATSAPP_NUMBER, GEMINI_API_KEY};
