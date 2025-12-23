const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

let timeLeft = 60;
let periodId = new Date().getTime().toString().slice(0, 10);
let history = [];

setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        const num = Math.floor(Math.random() * 10);
        let color = ([1,3,7,9].includes(num)) ? "green" : "red";
        if (num === 0) color = "red-violet";
        if (num === 5) color = "green-violet";
        
        const result = { period: periodId, number: num, color: color, size: num >= 5 ? "BIG" : "SMALL" };
        history.unshift(result);
        if(history.length > 10) history.pop();

        periodId = new Date().getTime().toString().slice(0, 10);
        timeLeft = 60;
        io.emit('gameResult', result);
    }
    io.emit('timerUpdate', { timeLeft, period: periodId });
}, 1000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
