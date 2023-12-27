const dataMapper = require("../dataMapper");


const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchResult: async (req, res) => {
    const { element, level, direction, value, name } = req.query

    try {
      // récupérer toutes les cards dont l'élément correspond à "element"
      let cards;

      if (element !== undefined) {
        cards = await dataMapper.getCardsByElement(element)
      }
      if (level) {
        cards = await dataMapper.getCardsByLevel(level)
      }
      if (direction) {
        cards = await dataMapper.getCardsByDirectionValue(direction, value)
      }
      if (name) {
        cards = await dataMapper.getCardsByName(name)
      }

      res.render('cardList', {
        cards,
        title: `Voici toutes les cartes ${element !== "sacre" ? element : "sacré"}`,
        deck: req.session.deck
      })
    } catch (error) {
      res.status(404).send('Erreur avec la db ' + error.message)
    }

  }
};

module.exports = searchController;