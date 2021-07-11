import { userLoginSchema } from "../schemas.js";
import { isValidEmail } from "./utils.js";
import bcrypt from "bcrypt";
import connection from "../connectDb.js";
import { v4 as uuid } from "uuid";

export const handlePostSignin = async (req, res) =>{
    try{
        if(userLoginSchema.validate(req.body).error !== undefined){
            return res.sendStatus(400);
        }
        const email = String(req.body.email).trim();
        if(!isValidEmail(email)){
            return res.sendStatus(400);
        }
        const password = String(req.body.password).trim();
        const usersArray = await connection.query("SELECT * FROM users WHERE email=$1", [email]);
        if(usersArray && usersArray.rowCount <= 0){
            return res.sendStatus(404);
        }
        const user = usersArray.rows[0];
        if(user && bcrypt.compareSync(password, user.hashPassword)){
            const token = uuid();
            const tokenSaved = await connection.query(`INSERT INTO 
            sessions("userId", token)
            VALUES ($1, $2)`, [user.id, token]);
            res.status(200);
            return res.send({
                token: token,
                userName: user.name,
                userType: user.userType
            });
        }
        return res.sendStatus(403);
    } catch {
        return res.sendStatus(500);
    }
}