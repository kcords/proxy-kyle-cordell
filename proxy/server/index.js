const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

app.use(express.json());

app.use('/', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`HTTP ${req.method} received on ${req.path}`);
  next();
});

app.use(express.static(PUBLIC_DIR));

app.get('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3001/${id}/bookings`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.get('/api/reviews/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3002/api/listing/reviews/${id}`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.get('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`http://localhost:3003/api/home/${id}/photos`)
    .then(response => {res.send(response.data)})
    .catch(error => {res.send(error)});
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
