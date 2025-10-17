const express = require('express');
const app = express();
const PORT = 6000;

// Root route
app.get('/', (req, res) => {
  res.send('Order Service is running');
});

// Orders route
app.get('/orders', (req, res) => {
  res.json([{ id: 101, item: 'Laptop' }, { id: 102, item: 'Phone' }]);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
