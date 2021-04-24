const path = require('path'),
port = process.env.PORT
express = require('express'),
path = require('path'),
app = express(),
server = require('http').Server(app),
io = require('socket.io')(server),
bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, GET, POST');
    next();
});
app.use(express.static(path.join(__dirname, 'assets')));

io.on('connection', (socket) => {
    const user_id = socket.handshake.query.user_id;
	console.log(`User ${user_id} connected!`);
    
    socket.on('disconnect', () => {
		console.log(`User ${user_id} disconnected!`);
        io.emit('user connection', user_id);
    });
});

server.listen(port, () => {
	console.log(`Listening on localhost: ${port}`);
});
