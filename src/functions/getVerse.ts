import axios from "axios";
import { BIBLE } from "../config/env";

export async function getVerse() {
    try {
        const response = await axios.get(`${BIBLE}/?random=verse`);
        const verse: any = response.data;
        console.log(verse.verses[0].text);
        const reference: any = verse.reference;
        const text: any = verse.verses[0].text;

        return { reference, text }
    } catch (error) {
        console.log(error);
    }
}
