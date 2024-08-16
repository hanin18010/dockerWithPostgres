const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const { Client } = require('pg');


//init app
const PORT = process.env.PORT || 4000;
const app =express();

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({ 
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
 });
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('connected to redis...'));
redisClient.connect();

//connet to db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({
    connectionString: URI,

});
client
 .connect()
 .then(()=> console.log('connected to prostgres db...'))
 .catch((err) => console.log('faild to connect to postgres db : ',err));



app.get('/',(req,res)=>{ 
    redisClient.set('products','products...');
    res.send('<h1> hi hanin form node container  </h1>');

});

app.get('/data',async (req,res)=>{ 
    const products = await redisClient.get('products');
    res.send(`<h1> hi hanin form node container  </h1> <h2>${products}</h2>`);

});

app.listen(PORT,()=> console.log(`app is up and runing on port: ${PORT} `));