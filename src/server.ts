import express, { response } from "express";
import { sendMessage } from "./functions/sendMensage";
import { getVerse } from "./functions/getVerse";
import { WHATSAPP_NUMBER } from "./config/env";
import { GeminiChat } from "./config/gemini";

const app = express();
const PORT = process.env.PORT || 9000;
interface VerseResponse {
    reference: string;
    text: string;
}

const SendVerse = async () => {
    const verse_response: VerseResponse | undefined = await getVerse();
    const { reference, text } = verse_response || { reference: "", text: "" };

    // cleanReference contém uma versão do texto original sem caracteres indesejados, com espaços normalizados e a primeira letra em maiúscula.
    const cleanReference = reference
        .replace(/[\n\t()"]/g, "")
        .replace(/ {4,}/g, " ")
        .replace(/^\w/, (c: any) => c.toUpperCase());

    // cleanText contém uma versão do texto original sem caracteres indesejados, com espaços normalizados e a primeira letra em maiúscula.
    const cleanText = text
        .replace(/[\n\t()"]/g, "")
        .replace(/ {4,}/g, " ")
        .replace(/^\w/, (c: any) => c.toUpperCase());

    console.log(`no livro de ${reference} diz: ${text}`);
    try {
        const response = await sendMessage({
            WHATSAPP_NUMBER: WHATSAPP_NUMBER,
            templete_name: "random_verse",
            components: [
                {
                    type: "body",
                    parameters: [
                        {
                            type: "text",
                            text: `${cleanReference}`,
                        },
                        {
                            type: "text",
                            text: `${cleanText}`,
                        },
                    ],
                },
            ],
        });

        if (response && response.messages[0].message_status === "accepted") {
            const GeminiResponse = await GeminiChat({
                reference: reference,
                versicle: text,
            });

            await new Promise(resolve => setTimeout(resolve, 5000));
            
            const response = await sendMessage({
                WHATSAPP_NUMBER: WHATSAPP_NUMBER,
                templete_name: "explain_verse",
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: `${GeminiResponse}`,
                            },
                        ],
                    },
                ],
            });
        }
    } catch (error) {}
};

SendVerse();

app.get("/", (req, res) => {
    res.send(`Rocket Lounched in Port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Rocket Lounched in Port ${PORT}`);
});
