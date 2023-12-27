const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getAllCards();
      res.render('cardList', {
        cards,
        title: 'Liste des cartes',
        deck: req.session.deck,
        // deck: false
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  cardPage: async (req, res) => {
    const { id: cardId } = req.params

    try {
      const card = await dataMapper.getOneCardById(cardId);
      res.render('card', {
        card,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },
};

module.exports = mainController;
