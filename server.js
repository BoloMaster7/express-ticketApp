const express = require('express');
const cors = require('cors');
const uuid = require('uuid').v4;
const router = express.Router();
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();

// let uri = 'mongodb://bolomaster7:MongoTest1@<host>:27017/@cluster0.wzu9bjs.mongodb.net/?retryWrites=true&w=majority';



let uri = "";
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "production")
  uri =
    "mongodb+srv://m9KEMMlW5XB:ptY7Y3Stqkx3IAZPo3fQzmqbMwkdFfBNN@cluster0.cpy2a7a.mongodb.net/NewWaveDB?retryWrites=true&w=majority";
else if (NODE_ENV === "test") uri = "mongodb://localhost:27017/NewWaveDBtest";
else uri = "mongodb://localhost:27017/NewWaveDB";

//import routes
const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertsRoutes = require('./routes/concerts.routes.js');
const seatsRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));


app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api/', testimonialRoutes);
app.use('/api/', concertsRoutes);
app.use('/api/', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  if (NODE_ENV !== "test") {
    console.log("Server is running on port: 8000");
  };
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('new socket');
})


// connects our backend code with the database
// mongoose.connect('mongodb://localhost:27017/newVaveDB', { useNewUrlParser: true });

mongoose.connect('mongodb+srv://bolomaster7:fsQplixa7kUkDpbt@cluster0.wzu9bjs.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;


// mongoose.connect(uri, { useNewUrlParser: true }, (err, db) => {
//   // handle db
// });

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

module.exports = server;