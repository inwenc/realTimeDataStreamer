const express = require('express');

const app = express();

const io = require('socket.io')(3001);

const needle = require('needle');
const TWITTER_TOKEN = require('./config.js')
const streamURL ='https://api.twitter.com/2/tweets/sample/stream';




io.on('connect', (socket) => {

  console.log('a user is connected')

  const options = {
    timeout: 2000
  }

 var stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`
    }
  }, options)
  stream.on('data', data => {

   if (Buffer.byteLength(data) > 3) {


    const json = JSON.parse(data);
     console.log('json', json)
      //sends tweets to client
      if (json.data.text) {
      socket.emit('streamer', json);

      }
    }


  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  }).on('done', function(err, resp) {
    console.log('Ready-o!');
  })



})





