const redis = require("redis");

const client = redis.createClient();
const subscriber = client.duplicate();

(async () => {
  await subscriber.connect();

  await subscriber.subscribe('tasks', (message) => {
    console.log(message); // 'message'
  });
})();
