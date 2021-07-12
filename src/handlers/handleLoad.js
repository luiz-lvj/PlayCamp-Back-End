import connection from "../connectDb.js";

export const handleLoad = async (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if (!token) return res.sendStatus(401)  ;
        const sessionRequest = await connection.query(`SELECT * FROM sessions JOIN users ON sessions."userId" = users.id WHERE sessions.token = $1`, [token]);
        const user = sessionRequest.rows[0];
        console.log(user);
        if (user) {
            const requestGames = await connection.query('SELECT games.*, users.name as "devName" FROM games JOIN users ON games."developerId" = users.id');
            const gamesList = requestGames.rows;
            res.send(gamesList);
        }
        else {
            res.sendStatus(401);
        }

    } catch {
        return res.sendStatus(500);
    }
}