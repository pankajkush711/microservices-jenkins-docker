const express = require('express');
const app = express();
const PORT = 5000;

// Root route
app.get('/', (req, res) => {
  res.send('User Service is running');
});

// Users route
app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
