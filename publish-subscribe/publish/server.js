const redis = require("redis");
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const client = redis.createClient();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/tasks', async (req, res) => {
  try {
    await client.connect();
    await client.publish('tasks', JSON.stringify(req.body));
    res.send("Publishing an event using Redis");
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error publishing an event using Redis");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// (async () => {
//   await client.connect();

//   const task = {
//     description: "Wash my clothes",
//     completed: false
//   };

//   await client.publish("tasks", JSON.stringify(task));
// })();
