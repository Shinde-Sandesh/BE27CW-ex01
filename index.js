const express = require('express');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movie } = require("./models/movies.model");
const { User } = require("./models/users.model");

app.use(express.json());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

async function signup(userDetails) {
  try {
    const user = new User(userDetails);
    const newUser = await user.save();
    return newUser
  } catch (error) {
    throw error;
  }
}

app.post('/signup', async (req, res) => {
  try {
    const savedUser = await signup(req.body);
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user account' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});