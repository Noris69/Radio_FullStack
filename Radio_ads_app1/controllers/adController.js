const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  const { title, content, category, price, schedule } = req.body;

  try {
    const newAd = new Ad({
      title,
      content,
      category,
      price,
      schedule,
      created_at: new Date(),
    });

    const ad = await newAd.save();
    res.json(ad);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ msg: 'Ad not found' });
    }
    res.json(ad);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Ad not found' });
    }
    res.status(500).send('Server error');
  }
};

// Mise à jour d'une annonce publicitaire
exports.updateAd = async (req, res) => {
    const { title, content, category, price, schedule } = req.body;
    try {
      let ad = await Ad.findById(req.params.id);
      if (!ad) {
        return res.status(404).json({ msg: 'Ad not found' });
      }
  
      ad.title = title || ad.title;
      ad.content = content || ad.content;
      ad.category = category || ad.category;
      ad.price = price || ad.price;
      ad.schedule = schedule || ad.schedule;
  
      await ad.save();
      res.json(ad);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Suppression d'une annonce publicitaire
  exports.deleteAd = async (req, res) => {
    try {
      let ad = await Ad.findById(req.params.id);
      if (!ad) {
        return res.status(404).json({ msg: 'Ad not found' });
      }
  
      await ad.remove();
      res.json({ msg: 'Ad removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  