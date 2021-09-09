const Officers = require('./officers/officers-model')
const db = require('../data/dbConfig');

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
        it('should return a new array without removed officer', async() => {
          await Officers.insert({ name: "Picard" })
          await Officers.insert({ name: "Worf" })
          
          const id = 1

          expect(await Officers.remove(id)).toEqual(await db("officers"))

        })
    })
})