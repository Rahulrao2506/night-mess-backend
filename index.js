const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

const MONGODB_URI = 'mongodb+srv://rysy2506_db_user:Nirya%401982@cluster0.gosl7ll.mongodb.net/nightmess?appName=Cluster0';

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payment', require('./routes/payment'));

app.get('/', (req, res) => res.json({ message: 'Night Mess API Running!' }));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () =>
      console.log('🚀 Server running on port 5000')
    );
  })
  .catch(err => console.error('MongoDB error:', err));