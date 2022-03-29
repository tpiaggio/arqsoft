const weather = require('../utils/weather');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/help', (req, res) => {
  res.send('<h1>Help!</h1>');
});

app.get('/about', (req, res) => {
  res.send({
    name: 'Tomas',
    age: 29
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    res.send({error: 'You must provide an address'});
  }
  weather(req.query.address, (error, data) => {
    if(error) {
      res.send({error});
    } else {
      res.send({data});
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});