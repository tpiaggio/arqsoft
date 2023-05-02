const redis = require("redis");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const client = redis.createClient();

app.post('/publish', async (req, res) => {
  const { topic, message } = req.body;
  try {
    await client.connect();
    await client.publish(topic, message);
    res.send("Publishing an event using Redis");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error publishing an event using Redis");
  } finally {
    client.quit();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
