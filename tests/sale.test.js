import connection from '../src/connectDb';
import supertest from 'supertest';
import app from '../src/app';

describe("POST /endsale", () => {
    it("returns 401 for unauthorized access", async ()=>{
        const bodySale = {
            payment: "cash",
            games: []
        }
        const queryUnAuth = await supertest(app).post("/endsale").send(bodySale);
        expect(queryUnAuth.status).toEqual(401);
    });
    it("returns 404 for unknown signin", async () => {
        const bodySaleUnk = {
            payment: "cash",
            games: []
        }
        const queryUnknown = await supertest(app).post("/endsale")
        .set("authorization", `Bearer 123`).send(bodySaleUnk);
        expect(queryUnknown.status).toEqual(404);
    });
    it("returns 200 for valid sale", async () =>{
        let bodyValidSale = {
            name: "teste25",
            email: "teste25@teste.com",
            userType: "developer",
            password: "1225" 
        }
        const userCreated = await supertest(app).post("/signup").send(bodyValidSale);
        expect(userCreated.status).toEqual(201);
        bodyValidSale = {
            email: "teste25@teste.com",
            password: "1225"
        }
        const signinUser = await supertest(app).post("/signin").send(bodyValidSale);
        expect(signinUser.status).toEqual(200);
        expect(signinUser.body).toHaveProperty('token');
        const token = signinUser.body.token;
        const bodyValidSaleInfo = {
            payment: "cash",
            games: []
        }
        const validSale = await supertest(app).post("/endsale")
        .set("authorization", `Bearer ${token}`).send(bodyValidSaleInfo);
        expect(validSale.status).toEqual(200);
    });
    it("returns 400 for bad requests", async () =>{
        let validSaleBody = {
            name: "teste32",
            email: "teste32@teste.com",
            userType: "developer",
            password: "1232" 
        }
        const userCreated = await supertest(app).post("/signup").send(validSaleBody);
        expect(userCreated.status).toEqual(201);
        validSaleBody = {
            email: "teste32@teste.com",
            password: "1232"
        }
        const signinUser = await supertest(app).post("/signin").send(validSaleBody);
        expect(signinUser.status).toEqual(200);
        expect(signinUser.body).toHaveProperty('token');
        const token = signinUser.body.token;
        const validSaleBodyInfo = {
            payment: "anything",
            games: []
        }
        const validSale = await supertest(app).post("/endsale")
        .set("authorization", `Bearer ${token}`).send(validSaleBodyInfo);
        expect(validSale.status).toEqual(400);
    });
    beforeEach(async () => {
        await connection.query('DELETE FROM sales');
    });
    
    afterAll(async () => {
        await connection.query('DELETE FROM soldgames');
        await connection.end();
    });  
});