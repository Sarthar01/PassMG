
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()
app.use(cors())

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

const port = 3000
app.use(bodyParser.json());
const dbName = 'passMG';

client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({sucess:true , result :findResult})
})
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({sucess:true , result :findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
})