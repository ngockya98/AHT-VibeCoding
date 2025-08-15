const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/callback', (req, res) => {
  // Simulate payment captured event
  res.json({ status: 'received', data: req.body });
});

app.listen(8080, () => {
  console.log('Payment Gateway Mock listening on port 8080');
});
