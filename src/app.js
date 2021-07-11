import express from 'express';
import cors from 'cors';
import { handlePostSignup } from './handlers/handleSignup.js';
import { handlePostSignin } from './handlers/handleSignin.js';
import { handlePostLogout } from './handlers/handleLogout.js';


const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => await handlePostSignup(req, res));
app.post("/signin", async (req, res) => await handlePostSignin(req, res));
app.post("/logout", async (req, res) => await handlePostLogout(req, res));


export default app;