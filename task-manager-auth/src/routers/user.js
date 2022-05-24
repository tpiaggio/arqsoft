const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require('express')
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      const token = jwt.sign(JSON.stringify(user), "arquitectura2022");
      if (isValid) {
        res.json({token});
      } else {
        res.status(401).json({error: "Invalid Password"});
      }
    } else {
      res.status(401).json({error: "User does not exist"});
    }
  } catch(e) {
    res.status(500).send();
  }
});

router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch(e) {
    res.status(500).send();
  }
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch(e) {
    res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {new: true});
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch(e) {
    res.status(500).send();
  }
});

router.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch(e) {
    res.status(500).send();
  }
});

module.exports = router;