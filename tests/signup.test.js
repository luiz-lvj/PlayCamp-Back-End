
import connection from '../src/connectDb';
import supertest from 'supertest';
import app from '../src/app';

describe("POST sigup", ()=>{
    it("returns 201 for valid signup", async () =>{
        let body = {
            name: "teste",
            email: "teste@teste.com",
            userType: "developer",
            password: "123" 
        }
        const developerUserCreated = await supertest(app).post("/signup").send(body);
        expect(developerUserCreated.status).toEqual(201);
        body.userType = "normal";
        const normalUserCreated = await supertest(app).post("/signup").send(body);
        expect(normalUserCreated.status).toEqual(201);
    })
});
beforeEach(async () => {
    await connection.query('DELETE FROM users');
});

afterAll(() => {
    connection.end();
});