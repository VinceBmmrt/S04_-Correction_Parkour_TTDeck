const express = require('express');
const deckController = require('./controllers/deckController');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');

// CARDS
router.get('/', mainController.homePage);
router.get('/card/:id', mainController.cardPage)
// DECK
router.get('/deck', deckController.deckPage);
router.get('/addToDeck/:id', deckController.addToDeck)
router.get('/removeFromDeck/:id', deckController.removeFromDeck)
// SEARCH
router.get('/search', searchController.searchPage);
// ex : http://localhost:1234/search/element?element=poison
router.get('/search/element', searchController.searchResult);
// ex : http://localhost:1234/search/level?level=9
router.get('/search/level', searchController.searchResult);
// ex : http://localhost:1234/search/values?direction=north&value=2
router.get('/search/values', searchController.searchResult);
// ex : http://localhost:1234/search/name?name=ek
router.get('/search/name', searchController.searchResult);


module.exports = router;