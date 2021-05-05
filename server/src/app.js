const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');

// * Config
dotenv.config();

// * Importing middlewares
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// * Importing Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const languageRoutes = require('./routes/language.routes');
const propertyRoutes = require('./routes/property.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const addressRoutes = require('./routes/address.routes');
const addRoutes = require('./routes/add.routes');
const removeRoutes = require('./routes/remove.routes');

// * Initialization
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 8000;

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'));
app.use(helmet());

// * Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/language', languageRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/add', addRoutes);
app.use('/api/remove', removeRoutes);

// * Run when Client Connects
io.on('connection', (socket) => {
  // * Runs to the current client
  socket.emit('message', 'Welcome to my app');

  // * Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // * Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  socket.on('chatMessage', (msg) => {
    io.emit('msg', msg);
  });
});

module.exports = {
  server,
  port,
};
