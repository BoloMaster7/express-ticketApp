const express = require('express');
const db = require('../db.js');
const router = express.Router();
const uuid = require('uuid').v4;
const app = express();


router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);  
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials.find((data) => data.id == req.params.id));
});
router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author: author, text: text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'ok!' });
});
router.route('/testimonials/:id').put((req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimonial = db.testimonials.find((testimonial) => testimonial.id === id);
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);
router.route('/testimonials/:id').delete((req, res) => {
        const id = +req.params.id;
        db.testimonials.splice(
            db.testimonials.findIndex((testimontial) => testimontial.id === id),
            1
        );
        res.json({ message: 'Testimontial deleted' });
    },
    (err) => {
        console.log(err);
    }
);

  module.exports = router;