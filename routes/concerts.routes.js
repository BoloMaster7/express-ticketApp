const express = require('express');
const db = require('../db.js');
const uuid = require('uuid').v4;
const router = express.Router();

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
    res.json(db.concerts[Math.floor(Math.random() * (db.concerts.length))]);
    console.log(Math.floor(Math.random() * db.concerts.length));
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find((concert) => concert.id === +req.params.id));
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const id = uuid();
    const newConcert = { id: id, performer, genre, price, day, image };
    db.concerts.push(newConcert);
    res.json({ message: 'ok!' });
});

router.route('/concerts/:id').put(
    (req, res) => {
        const { performer, genre, price, day, image } = req.body;
        const id = +req.params.id;
        const concert = db.concerts.find((concert) => concert.id === id);
        concert.performer = performer;
        concert.genre = genre;
        concert.price = price;
        concert.day = day;
        concert.image = image;
        res.json({ message: 'ok!' });
    },
    (err) => {
        console.log(err);
    }
);

router.route('/concerts/:id').delete(
    (req, res) => {
        const id = +req.params.id;
        db.concerts.splice(
            db.concerts.findIndex((concert) => concert.id === id),
            1
        );
        res.json({ message: 'Concert deleted' });
    },
    (err) => {
        console.log(err);
    }
);

module.exports = router;