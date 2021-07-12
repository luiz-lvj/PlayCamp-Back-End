import supertest from "supertest";
import app from "../src/app";
import connection from "../src/connectDb";

describe("GET /games", () => {
    it("returns 200 for valid game loading requests", async () => {
        let body7 = {
            name: "teste",
            email: "teste7@teste.com",
            userType: "developer",
            password: "123" 
        }
        const userCreatedTest = await supertest(app).post("/signup").send(body7);
        expect(userCreatedTest.status).toEqual(201);
        body7 = {
            email: "teste7@teste.com",
            password: "123"
        }
        const signinUserTest = await supertest(app).post("/signin").send(body7);
        expect(signinUserTest.status).toEqual(200);
        expect(signinUserTest.body).toHaveProperty('token');
        const token = signinUserTest.body.token;
        const loadGame = await supertest(app).get("/games")
        .set("authorization", `Bearer ${token}`).send();
        expect(loadGame.status).toEqual(200);
    });
    it("returns 401 for unauthorized requests", async () => {
        let loginUnathorizedBody = {
            name: "teste",
            email: "teste@teste.com",
            userType: "developer",
            password: "123" 
        }
        const userCreatedTestBad = await supertest(app).post("/signup").send(loginUnathorizedBody);
        expect(userCreatedTestBad.status).toEqual(201);
        loginUnathorizedBody = {
            email: "teste@teste.com",
            password: "123"
        }
        const signinUserTestBad = await supertest(app).post("/signin").send(loginUnathorizedBody);
        expect(signinUserTestBad.status).toEqual(200);
        expect(signinUserTestBad.body).toHaveProperty('token');
        const loadGameBad = await supertest(app).get("/games")
        .set("authorization", null).send();
        expect(loadGameBad.status).toEqual(401);
    });
    
    beforeEach(async () => {
        await connection.query('DELETE FROM users');
        await connection.query('DELETE FROM sessions');
    });
    
    afterAll(async () => {
        await connection.query('DELETE FROM users');
        await connection.query('DELETE FROM sessions')
        await connection.end();
    });
});