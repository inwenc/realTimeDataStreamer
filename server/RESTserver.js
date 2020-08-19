const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const needle = require('needle');
const TWITTER_TOKEN = require('./config.js')
const { sanitizeData } = require('./helperFunc.js')


app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// function sanitizedData (data) {
//   var arr = data.statuses;
//   var newArr = [];
//   for (var i = 0; i < arr.length; i++) {
//     var obj = {
//       time: arr[i].created_at,
//       text: arr[i].text,
//       id: arr[i].id
//     }
//     newArr.push(obj);

//   }
//   return newArr;
// }

app.post('/tweets', (req, res) => {

  const options = {
    timeout: 2000
  }
  var data = req.body.title;
  console.log('body', data)
  var arr = [];

  var streamURL = `https://api.twitter.com/1.1/search/tweets.json?q=${data}&result_type=recent`
  var stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`
    }, options
  })
  stream.on('data', data => {
    try {
      //incoming data is buffer
      //const json = JSON.parse(data);
      console.log('data', data)
      var newData = sanitizeData(data);
      res.end(JSON.stringify(newData))

    } catch (e) {
      // Keep alive signal received. Do nothing.
      console.log('3')
    }
  }).on('error', error => {
    if (error.code === 'ETIMEDOUT') {
      stream.emit('timeout');
    }
  });

   })




app.listen('3000', () => {
  console.log('server up')
})

