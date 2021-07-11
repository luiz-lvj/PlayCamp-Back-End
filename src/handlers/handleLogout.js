import connection from "../connectDb";

export const handlePostLogout = async (req, res) => {
    try{
        const authorization = req.headers['authorization'];
        const token = authorization?.replace("Bearer ", "");
        if(!token){
            return res.sendStatus(401);
        }
        const deleteToken = await connection.query(`DELETE FROM sessions 
        WHERE token=$1`, [token]);
        if(deleteToken.rowCount > 0){
            return res.sendStatus(200);
        }
        return res.sendStatus(401)
        
    } catch{
        return res.sendStatus(500);
    }
}