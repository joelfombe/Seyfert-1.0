import axios from "axios";
import { FROM_PHONE_NUMBER_ID, TOKEN, VERSION } from "../config/env";

interface IMessage {
    WHATSAPP_NUMBER: any;
    templete_name: any;
    components: any;
}

const sendMessage = async ({
    WHATSAPP_NUMBER,
    templete_name,
    components,
}: IMessage) => {

    console.log(WHATSAPP_NUMBER);
    try {
        const response = await axios.post(
            `https://graph.facebook.com/${VERSION}/${FROM_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: `${WHATSAPP_NUMBER}`,
                type: "template",
                template: {
                    name: templete_name,
                    language: {
                        code: "en_US",
                    },
                    components
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao enviar a mensagem:", error.message);
        if (error.response) {
            console.error("Resposta do servidor:", error.response.data);
        }
    }
};

export { sendMessage };
