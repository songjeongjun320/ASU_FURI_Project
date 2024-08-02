const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const containerRoutes = require('./routes/containerRoutes');

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Container Management API');
});

app.use('/api/containers', containerRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
