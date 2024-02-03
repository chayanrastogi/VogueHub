import http from 'http';
import app from './app/app.js';
import colors from 'colors';

const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
server.listen(PORT, console.log(`Server is up and running on port ${PORT}`.bgGreen.bold));
