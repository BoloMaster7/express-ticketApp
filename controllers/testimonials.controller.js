const Testimonial = require('../models/Testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const prod = await Testimonial.findOne().skip(rand);
    if (!prod) res.status(404).json({ message: 'Not found' });
    else res.json(prod);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  const { author, text } = req.body;
  try {
    const prod = await Testimonial.findById(req.params.id);
    if (prod) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        { $set: { author: author, text: text } }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createTestimonial = async (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = new Testimonial({ author: author, text: text });
  newTestimonial
    .save()
    .then(() => res.json({ message: 'OK' }))
    .catch((err) => res.status(500).json({ message: err }));
};

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;
  try {
    const prod = await Testimonial.findById(req.params.id);
    if (prod) {
      await Testimonial.updateOne(
        { _id: req.params.id },
        { $set: { author: author, text: text } }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  Testimonial.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'OK' }))
    .catch((err) => res.status(500).json({ message: err }));
};


