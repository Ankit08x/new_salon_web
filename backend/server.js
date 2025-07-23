require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const appointmentRoutes = require('./routes/appointmentRoutes');
const contactRoutes = require('./routes/contactRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/appointmentDB')
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.use('/app', appointmentRoutes);       
app.use('/contact-us', contactRoutes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
