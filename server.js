const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');


const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); 

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000' 
}));

const httpServer = http.createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log(`Socket Conectado: ${socket.id}`);
  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`Socket ${socket.id} entrou na sala ${conversationId}`);
  });
  socket.on('disconnect', () => {
    console.log(`Socket Desconectado: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- ROTAS ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/users', require('./routes/user'));
app.use('/api/messages', require('./routes/message'));

app.get('/', (req, res) => {
  res.send('API dos Anjos Urbanos está funcionando!');
});

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} (com Sockets)`);
});