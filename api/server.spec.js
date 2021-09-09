const request = require('supertest'); 
const db = require('../data/dbConfig');
const Officers = require('./officers/officers-model')
const server = require('./server.js');

beforeEach(async () => {
    await db('officers').truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('server.js', () => {

    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      const res = await request(server).get('/');

      expect(res.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'running' };

      const res = await request(server).get('/');

      expect(res.body).toEqual(expectedBody);
    });

    it('should return a JSON object from the index route', async () => {
      const res = await request(server).get('/');

      expect(res.type).toEqual('application/json');
    });

  })
  describe('endpoints', () => {
    describe('endpoints', () => {
        describe("[GET] /api/officers", () => {
            it("responds with a status 200", async () => {
                const res = await request(server).get('/api/officers')
                expect(res.status).toBe(200)
            })
            it('returns an array', async () => {
                const res = await request(server).get('/api/officers')
                const officers = await db("officers")
                expect(res.body).toEqual(officers)
            })
            it('returns right amount of officers', async () =>{
                await db('officers').insert({ name: "Picard" })
                const res = await request(server).get('/api/officers')
                expect(res.body).toHaveLength(1);
            })
        })
        describe("[POST] /api/officers", () => {
            it('should return status 201', async () => {
                const res = await request(server).post('/api/officers').send({ name: 'Data' })
                expect(res.status).toBe(201)
            })
            it('should return inserted officer', async () => {
                const res = await request(server).post('/api/officers').send({ name: 'Data' })
                expect(res.body).toMatchObject({name: "Data"})
            })
        })
        describe("[DELETE] /api/officers/:id", () => {
            it('should respond with status 200', async () => {
                const {id} = await db("officers").insert({ name: "Picard" })
                const res = await request(server).delete(`/api/officers/${id}`)
                expect(res.status).toBe(204)
            })
            it("should remove officer from database", async () => {
                await db('officers').insert({name: "Picard"})
                expect(await db('officers')).toHaveLength(1)
                await request(server).delete(`/api/officers/${1}`)
                        .then(async() => {
                            const find = await Officers.findAll()
                            expect(find).toHaveLength(0)
                        })
                                      
            })
        })
  })
});