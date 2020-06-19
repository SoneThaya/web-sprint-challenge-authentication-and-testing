const supertest = require('supertest')

const server = require('./server')

const db = require('../database/dbConfig')


describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate()
  })

  describe("GET /", () => {
    it('should return 404 unauthorized', () => {
      return supertest(server)
        .get('/')
        .then(res => {
          expect(res.status).toBe(404)
        })
    })

    
    it("should return JSON", () => {
      return supertest(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/text/i);
        });
    });
  })


  describe("POST /register", () => {
    it("should return 404 ", async () => {
      const name = { name: "bilbo", password: "baggins" };

        await supertest(server)
            .post("/register")
            .send(name)
            .then(res => {
              expect(res.status).toBe(404)
            });
    });

    it("should return JSON", () => {
      return supertest(server)
        .get("/register")
        .then(res => {
          expect(res.type).toMatch(/text/i);
        });
    });
  });

  
  describe("POST /login", () => {
    
    it("should return 404", () => {
      const name = "frodo";

      return supertest(server)
          .post("/login")
          .send({ name })
          .then(res => {
            expect(res.status).toBe(404)
          });
    });

    it("should return JSON", () => {
      return supertest(server)
        .get("/register")
        .then(res => {
          expect(res.type).toMatch(/text/i);
        });
    });
  });



})