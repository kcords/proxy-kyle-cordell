const express = require('express');
const path = require('path');
const axios = require('axios');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(compression());
app.use(express.json());

app.use('/', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`HTTP ${req.method} received on ${req.path}`);
  next();
});

app.use(express.static(PUBLIC_DIR));

app.get('/api/rooms/:id/reviews', (req, res) => {
  const { id } = req.params;
  console.log(req)
  axios.get(`http://3.86.84.247/api/rooms/${id}/reviews`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.get('/api/rooms/:id/booking', (req, res) => {
  const { id } = req.params;
  axios.get(`http://54.201.229.11/api/rooms/${id}/booking`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.get('/api/rooms/:id/booking/calendar', (req, res) => {
  const { id } = req.params;
  axios.get(`http://54.201.229.11/api/rooms/${id}/booking/calendar`)
    .then(response => {res.send(response.data)})
    .catch(error => {
      console.log(error)
      res.send(error)});
});

app.get('/api/home/:id/photos', (req, res) => {
  const { id } = req.params;
  axios.get(`http://3.19.213.23/api/home/${id}/photos`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
