let reminders = [];

export default function handler(req, res) {

    if (req.method === "GET") {
        return res.json(reminders);
    }

    if (req.method === "POST") {
        const reminder = {
            id: Date.now(),
            text: req.body.text,
            time: req.body.time
        };

        reminders.push(reminder);
        return res.json(reminder);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        reminders = reminders.filter(r => r.id != id);
        return res.json({ ok: true });
    }

    res.status(405).end();
}