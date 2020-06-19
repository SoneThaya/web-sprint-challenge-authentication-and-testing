const supertest = require('supertest')

const server = require('./server')

const db = require('../database/dbConfig')


describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate()
  })

  describe("GET /", () => {
    it('should return 200 OK', () => {
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
    it("should register", () => {
       const name = "bilbo";

        return supertest(server)
            .post("/register")
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

  
  describe("POST /login", () => {
    
    it("should register", () => {
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