const Queue = require('bull');

const myQueue = new Queue('myQueue');

myQueue.process(async (job) => {
  console.log(`Processing job ${job.id}`);
  // Do some async work here
  // ...
  console.log(`Job ${job.id} completed`);
});

console.log('Worker started');