const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); 

// === RESTful api ===
app.get('/api/users', (req, res) => {
  res.json(["just a sample array to prove GET method! - - "]); // 
});

app.post('/api/users', (req, res) => {
  // return the request body to indicate successful creation
  res.status(201).json(req.body);
});

// === GET + query parameters ===
// [eg]：/api/CreateUser?name=Oscar&session=abc123&address=GA&age=26
app.get('/api/CreateUser', (req, res) => {
  const { name = '', session = '', address = '', age = '' } = req.query;
  const user = { name, session, address, age: age === '' ? '' : Number(age) };

  // === Save to local file -> userInfo.json ===
  const file = path.join(__dirname, 'userInfo.json');
  try {
    fs.writeFileSync(file, JSON.stringify(user, null, 2), 'utf-8');
    res.json({ saved: true, file: 'userInfo.json', user });
  } catch (err) {
    res.status(500).json({ saved: false, error: err.message });
  }
});

// The root directory used to test whether the express server is running normally
app.get('/', (req, res) => {
  res.send('Hello Express, server is running 123!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
