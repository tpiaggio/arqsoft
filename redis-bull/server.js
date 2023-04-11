const express = require('express');
const Queue = require('bull');

// Create a new Bull queue
const myQueue = new Queue('myQueue');

// Create an Express app
const app = express();

app.use(express.json());

app.post('/jobs', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(400).send('Job data is required');
    return;
  }
  const job = await myQueue.add(data);
  res.json({ id: job.id });
});

app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const job = await myQueue.getJob(id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  const state = await job.getState();
  res.json({ state });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});