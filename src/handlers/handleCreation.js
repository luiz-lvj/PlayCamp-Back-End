import connection from "../connectDb.js";

export const handleCreation = async (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');
        const { name, img, price, description } = req.body;

        if (!token) return res.sendStatus(401);
        const sessionRequest = await connection.query(`SELECT * FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1`, [token]);
        const user = sessionRequest.rows[0];
        console.log(user);
        if (user) {
            const add = await connection.query(`INSERT INTO games (name, img, "developerId", price, description) VALUES ($1, $2, $3, $4, $5)`, [name, img, user.id, price, description]);
            return res.sendStatus(201);
        }
        else {
            res.sendStatus(401);
        }

    } catch {
        return res.sendStatus(500);
    }
}