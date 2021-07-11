import supertest from "supertest";
import app from "../src/app";
import connection from "../src/connectDb";

describe("POST /signin", () => {
    it("returns 200 for valid login", async () => {
        let body = {
            name: "teste",
            email: "teste@teste.com",
            userType: "developer",
            password: "123" 
        }
        const userCreated = await supertest(app).post("/signup").send(body);
        expect(userCreated.status).toEqual(201);
        body = {
            email: "teste@teste.com",
            password: "123"
        }
        const signinUser = await supertest(app).post("/signin").send(body);
        expect(signinUser.status).toEqual(200);
        expect(signinUser.body).toHaveProperty('token');
    });
    it("returns 400 for bad requests", async () => {
        let body = {
            name: "teste",
            email: "teste@teste.com",
            userType: "developer",
            password: "123" 
        }
        const userCreated = await supertest(app).post("/signup").send(body);
        expect(userCreated.status).toEqual(201);
        body = {
            email: "teste@teste.com"
        }
        const signinUser = await supertest(app).post("/signin").send(body);
        expect(signinUser.status).toEqual(400);
    });
    it("returns 404 for unknown user", async () => {
        const body = {
            email: "teste@teste.com",
            password: "123"
        }
        const signinUser = await supertest(app).post("/signin").send(body);
        expect(signinUser.status).toEqual(404);
    });
    it("returns 403 for wrong password", async () =>{
        let body = {
            name: "teste2",
            email: "teste2@teste2.com",
            userType: "normal",
            password: "123" 
        }
        const userCreatedTest = await supertest(app).post("/signup").send(body);
        expect(userCreatedTest.status).toEqual(201);
        body = {
            email: "teste2@teste2.com",
            password: "456"
        }
        const signinUserTest = await supertest(app).post("/signin").send(body);
        expect(signinUserTest.status).toEqual(403);
    });
});
beforeEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions');
});

afterAll(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM sessions')
    connection.end();
});

