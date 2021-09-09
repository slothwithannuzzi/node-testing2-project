const express = require('express');

const Officers = require('./officers/officers-model')

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.get('/api/officers', (req,res)=> {
    Officers.findAll()
        .then(officers =>{
            res.status(200).json(officers)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})
server.post('/api/officers', (req,res) => {
    Officers.insert(req.body)
        .then(officer => {
            res.status(201).json(officer)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})
server.delete('/api/officers/:id', (req,res) => {
    Officers.remove(req.params.id)
        .then(removed => {
            res.status(204).json(removed.body)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = server;