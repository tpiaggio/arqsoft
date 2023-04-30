const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/task-manager');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  User.find({}).then((users) => {
    res.send(users);
  }).catch((e) => {
    res.status(500).send();
  })
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  User.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }).catch((e) => {
    res.status(500).send();
  })
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save().then(() => {
    res.status(201).send(task);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
