const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/Authentication');
const taskRoutes = require('./Routes/tasks');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // React dev server
    credentials: true,               // needed for cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('API is running...'));
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
