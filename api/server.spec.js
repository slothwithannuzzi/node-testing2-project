const request = require('supertest'); 
const db = require('../data/dbConfig');

const Officers = require('./officers/officers-model')

const server = require('./server.js'); 

describe('server.js', () => {

  describe('index route', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get('/');

      expect(response.status).toEqual(expectedStatusCode);
    });

    it('should return a JSON object from the index route', async () => {
      const expectedBody = { api: 'running' };

      const response = await request(server).get('/');

      expect(response.body).toEqual(expectedBody);
    });

    it('should return a JSON object from the index route', async () => {
      const response = await request(server).get('/');

      expect(response.type).toEqual('application/json');
    });
    it('should return an array of officers from the api/officers route', async () => {
        const response = await request(server).get('/api/officers')
        const officers = await db("officers")
        expect(response.body).toEqual(officers)
    })
    it('should return inserted officer from a post request to api/officers route', async () => {
        const response = await request(server).post('/api/officers').send({ name: 'Data' })
        expect(response.status).toBe(201)
        expect(response.body).toMatchObject({name: "Data"})
    })
  });
  describe('officers model', () => {
      describe('insert()', () =>{
          beforeEach(async () => {
              await db('officers').truncate();
          })
          it('should insert the provided officers into the db', async ()=> {
              await Officers.insert({ name: "Picard" })
              await Officers.insert({ name: "Worf" })

              const officers = await db('officers');

              expect(officers).toHaveLength(2);
          })
          it("should insert the provided officer into the db", async() =>{
              let officer = await Officers.insert({ name: "Riker" })
              expect(officer.name).toBe("Riker")

              officer = await Officers.insert({ name: "Troi" })
              expect(officer.name).toBe('Troi')
          })
      })
      describe('remove()', () =>{
        beforeEach(async () => {
            await db('officers').truncate();
        })

        it('should remove the officer with provided id', async() => {
            await Officers.insert({ name: "Picard" })
            await Officers.insert({ name: "Worf" })
            
            const officers = await db('officers')
            expect(officers).toHaveLength(2);
            const id = 1
            await Officers.remove(id)
            const officer = await db('officers')
            expect(officer).toHaveLength(1);            
          })
          it('should return a message about officer removed', async() => {
            await Officers.insert({ name: "Picard" })
            await Officers.insert({ name: "Worf" })
            
            const id = 1
            const returned = `The officer with ${id} was deleted.`

            expect(await Officers.remove(id)).toEqual(returned)

          })
      })
  })
});