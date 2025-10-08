const express = require('express');
const cors = require('cors');
require('dotenv').config();

const brewRoutes = require('./routes/brews');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/brews', brewRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Coffee Brew Log API is running!' });
});

// Error handling 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});