import connection from "../connectDb.js";

export const handlePostSale = async (req, res) => {
    try{
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');
        if(!token){
            return res.sendStatus(401);
        }
        const userSessions = await connection.query(`SELECT "userId" FROM sessions WHERE token=$1`,[token]);
        if(userSessions.rowCount <= 0){
            return res.sendStatus(404);
        }
        const userId = userSessions.rows[0].userId;
        const payment = String(req.body.payment).trim();
        if(payment !== "cash" && payment !== "credit"){
            return res.sendStatus(400);
        }
        const games = req.body.games;
        const date = new Date().toISOString();
        const saleInsert = await connection.query(`INSERT INTO
        sales(date, "userId", payment)
        VALUES($1, $2, $3) RETURNING *`, [date, userId, payment]);
        const saleId = saleInsert.rows[0].id;
        const soldGames = await Promise.all(games.map(async game=> {
            await connection.query(`INSERT INTO
            soldgames("userId", "gameId", quantity, "saleId")
            VALUES($1, $2, $3, $4)`, [userId, game.gameId, game.qtd, saleId]);
        }));
        return res.sendStatus(200);

    } catch (err){
        console.log(err);
        return res.sendStatus(500);
    }
}