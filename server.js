const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const footerRoutes = require('./routes/footer');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/footer', footerRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening on port ' + port));