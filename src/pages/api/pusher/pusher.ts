import Pusher from "pusher";
import {NextApiRequest, NextApiResponse} from "next";

export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { message, sender } = req.body;
    const response = await pusher.trigger("chat", "chat-event", {
        message,
        sender,
    });

    res.json({ message: "completed" });
}