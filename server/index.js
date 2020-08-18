const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');

const io = require('socket.io')(3000);

const needle = require('needle');
const TWITTER_TOKEN = require('./config.js')



const streamURL = 'https://api.twitter.com/2/tweets/sample/stream';
//app.get('/', (req, res) => {
io.on('connect', (socket) => {
  console.log('a user connected')
  const options = {
    timeout: 2000
  }

 var stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`
    }
  }, options)
  stream.on('data', data => {
    try {
      //incoming data is buffer
      const json = JSON.parse(data);
      //res.json(json)
      //send tweets to client
      socket.emit('twitter', json);
    } catch (e) {
      // Keep alive signal received. Do nothing.
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });



})