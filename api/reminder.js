import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {

    try {

        // GET — получить все
        if (req.method === "GET") {
            const result = await pool.query(
                "SELECT * FROM reminders ORDER BY id DESC"
            );
            return res.json(result.rows);
        }

        // POST — добавить
        if (req.method === "POST") {
            const { text, time } = req.body;

            const result = await pool.query(
                "INSERT INTO reminders (text, time) VALUES ($1, $2) RETURNING *",
                [text, time]
            );

            return res.json(result.rows[0]);
        }

        // DELETE — удалить
        if (req.method === "DELETE") {
            const { id } = req.body;

            await pool.query(
                "DELETE FROM reminders WHERE id = $1",
                [id]
            );

            return res.json({ ok: true });
        }

        res.status(405).end();

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
