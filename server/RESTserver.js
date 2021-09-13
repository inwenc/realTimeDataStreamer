require("dotenv").config();
const express = require("express");
const needle = require("needle");
const { sanitizeData } = require("./helperFunc.js");
const port = process.env.APP_PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/tweets", (req, res) => {
  const options = {
    timeout: 2000,
  };
  const data = req.body.title;
  const streamURL = `https://api.twitter.com/1.1/search/tweets.json?q=${data}&result_type=recent`;
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
    },
    options,
  });
  stream
    .on("data", (data) => {
      try {
        //incoming data is buffer

        const newData = sanitizeData(data);
        res.end(JSON.stringify(newData));
      } catch (e) {
        // Keep alive signal received. Do nothing.
        console.log(e);
      }
    })
    .on("error", (error) => {
      if (error.code === "ETIMEDOUT") {
        stream.emit("timeout");
      }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
