import { userSchema } from "../schemas";
import bcrypt from 'bcrypt';
import connection from "../connectDb";
import { isValidEmail } from "./utils";

export const handlePostSignup = async (req, res) =>{
    try{
        if(userSchema.validate(req.body).error !== undefined){
            return res.sendStatus(400);
        }
        const name = req.body.name;
        const email = String(req.body.email).trim();
        const password = String(req.body.password).trim();
        const userType = String(req.body.userType).trim();
        const hashPassword = bcrypt.hashSync(password, 10);
        if(!isValidEmail(email) || password.includes(" ")){
            return res.sendStatus(400);
        }
        if(await isDuplicatedEmail(email)){
            return res.sendStatus(409);
        }
        const newUser = await connection.query(`INSERT INTO
        users(name, email, "hashPassword", "userType")
        VALUES ($1, $2, $3, $4)
        `, [name, email, hashPassword, userType]);
        
        return res.sendStatus(201);

    } catch{
        return res.sendStatus(500);
    }
}

const isDuplicatedEmail = async (email) =>{
    try{
        const emailUser = await connection.query("SELECT email FROM users WHERE email=$1",[email]);
        if(emailUser.rowCount > 0){
            return true;
        }
        return false;
    } catch{
        return true;
    }
}