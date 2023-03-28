const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find({}));
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.getRandom = async (req, res) => {

  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Concert.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.getById = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

};

exports.createConcert = async (req, res) => {
  try {

    const { performer, genre, price, day, image, tickets } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image, tickets});
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }

};


exports.updateConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const id = +req.params.id;
    const concert = await Concert.findById(id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      concert.performer = performer;
      concert.genre = genre;
      concert.price = price;
      concert.day = day;
      concert.image = image;
      await concert.save();
      res.json(concert);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const id = +req.params.id;
    const concert = await Concert.findById(id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else {
      await concert.remove();
      res.json({ message: 'Concert deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

