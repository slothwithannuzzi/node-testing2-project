const db = require("../../data/dbConfig");

function findAll(){
    return db("officers")
}
function findById(id){
    return db("officers")
        .where("id", id)
        .first();
}

async function insert(officer){
    const[id] = await db("officers").insert(officer)
    return findById(id)
}

async function remove(id){
    await db("officers")
         .where("id", id)
         .del()
    return findAll()
}

module.exports = {
    findAll,
    findById,
    insert,
    remove
}