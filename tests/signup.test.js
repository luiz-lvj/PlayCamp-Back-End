
import connection from '../src/connectDb';
import supertest from 'supertest';
import app from '../src/app';

describe("POST /signup", ()=>{
    it("returns 201 for valid signup", async () =>{
        const body1 = {
            name: "teste1",
            email: "teste1@teste1.com",
            userType: "developer",
            password: "123" 
        }
        const developerUserCreated = await supertest(app).post("/signup").send(body1);
        expect(developerUserCreated.status).toEqual(201);
        const body2 = {
            name: "teste2",
            email: "teste2@teste.com",
            userType: "normal",
            password: "123" 
        }
        const normalUserCreated = await supertest(app).post("/signup").send(body2);
        expect(normalUserCreated.status).toEqual(201);
    });
    it("returns 400 for invalid signup", async () =>{
        const body1 = {}
        const userCreated1 = await supertest(app).post("/signup").send(body1);
        expect(userCreated1.status).toEqual(400);
        const body2 = {
            name: "teste",
            email: "anything",
            userType: "normal",
            password: "123"
        }
        const userCreated2 = await supertest(app).post("/signup").send(body2);
        expect(userCreated2.status).toEqual(400);
        const body3 = {
            name: "teste",
            email: "certo@certo.com",
            userType:"wrong",
            password: "123"
        }
        const userCreated3 = await supertest(app).post("/signup").send(body3);
        expect(userCreated3.status).toEqual(400);
    });
    it("returns 409 for duplicated email", async ()=>{
        const duplicatedBody = {
            name: "testuserduplicated",
            email: "testuserduplicated@testuserduplicated.com",
            userType: "normal",
            password: "123"
        }
        const userCreated1 = await supertest(app).post("/signup").send(duplicatedBody);
        expect(userCreated1.status).toEqual(201);
        const userCreated2 = await supertest(app).post("/signup").send(duplicatedBody);
        expect(userCreated2.status).toEqual(409);
    });
    beforeEach(async () => {
        await connection.query('DELETE FROM users');
    });
    
    afterAll(async () => {
        await connection.query('DELETE FROM users');
        await connection.end();
    });
    
});

