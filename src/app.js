import express from 'express';
import cors from 'cors';
import { handlePostSignup } from './handlers/handleSignup.js';
import { handlePostSignin } from './handlers/handleSignin.js';


const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => await handlePostSignup(req, res));
app.post("/signin", async (req, res) => await handlePostSignin(req, res));


export default app;