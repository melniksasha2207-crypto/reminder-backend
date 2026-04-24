let reminders = [];

export default function handler(req, res) {

    // 📥 получить все напоминания
    if (req.method === "GET") {
        return res.json(reminders);
    }

    // ➕ добавить напоминание
    if (req.method === "POST") {
        const newReminder = {
            id: Date.now(),
            text: req.body.text,
            time: req.body.time
        };

        reminders.push(newReminder);
        return res.json(newReminder);
    }

    // ❌ удалить напоминание
    if (req.method === "DELETE") {
        const { id } = req.body;

        reminders = reminders.filter(r => r.id != id);
        return res.json({ ok: true });
    }

    res.status(405).end();
}
