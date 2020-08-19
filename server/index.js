const express = require('express');

const app = express();
//const http = require('http').Server(app);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
const io = require('socket.io')(3001);

const needle = require('needle');
const TWITTER_TOKEN = require('./config.js')
const streamURL ='https://api.twitter.com/2/tweets/sample/stream';




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
   // try {
      //incoming data is buffer
    if(typeof data === 'object') {
    //console.log('TYPEOF', typeof data)
    const json = JSON.parse(data);
     console.log('json', JSON.parse(data))
      //res.json(json)
      //sends tweets to client

      socket.emit('streamer', json);


    // } catch (e) {
    //   // Keep alive signal received. Do nothing.
    //   console.log('err in catch', e);
    //

}
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  }).on('done', function(err, resp) {
    console.log('Ready-o!');
  })



})





