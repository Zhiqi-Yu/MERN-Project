const express = require('express');
const cors = require('cors');
const mongooseObj = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json({limit:'2mb', extended:false})); 

// connect to MongoDB
const MONGO_URI = 'mongodb://127.0.0.1/shoppingCartDB25a';
const PORT = 9000;

mongooseObj.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected:', MONGO_URI))
  .catch((err) => console.error('Mongo connect error:', err.message));

app.get('/', (_req, res) => res.send('API ok'));

app.use('/api/products', require('./routes/productRoutes'));

// 简单错误处理
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500)
     .json({ message: err.message || 'Server Error' });
});

app.listen(PORT, () => console.log(`✅ Server: http://localhost:${PORT}`));
