var port = Number(process.env.port) || 1337;
const io = require("socket.io")(port);

const needle = require("needle");
const streamURL = "https://api.twitter.com/2/tweets/sample/stream";

io.on("connect", (socket) => {
  console.log("a user is connected");

  const options = {
    timeout: 2000,
  };

  const stream = needle.get(
    streamURL,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_TOKEN}`,
      },
    },
    options
  );
  stream
    .on("data", (data) => {
      if (Buffer.byteLength(data) > 3) {
        const json = JSON.parse(data);
        //sends tweets to client
        if (json.data.text) {
          socket.emit("streamer", json);
        }
      }
    })
    .on("error", (error) => {
      if (error.code === "ETIMEDOUT") {
        stream.emit("timeout");
      }
    })
    .on("done", function (err, resp) {
      console.log("Ready-o!");
    });
});
