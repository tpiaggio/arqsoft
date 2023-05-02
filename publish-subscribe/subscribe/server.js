const redis = require("redis");

const client = redis.createClient();

(async () => {
  const args = process.argv;
  await client.connect();

  await client.subscribe(args[2], (message) => {
    console.log(message);
  });
})();
