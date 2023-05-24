import express from 'express'
const app = express();
import http from 'http'
import { Server } from 'socket.io'
import path from 'path';

const __dirname = path.resolve();

const httpserver = http.createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: [`http://localhost:3000`]
    }
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on("send-message", (data) => {
        socket.emit("message-from-server", data)
    })
});

const PORT = 4000
httpserver.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});