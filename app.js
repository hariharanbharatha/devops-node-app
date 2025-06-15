const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 👇 Add this here
app.get('/about', (req, res) => {
  res.send('This is the About Page. Updated via Jenkins automation!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

