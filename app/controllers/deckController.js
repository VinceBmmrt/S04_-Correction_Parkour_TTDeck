const dataMapper = require("../dataMapper");

const deckController = {
    deckPage: (req, res) => {
        res.render('cardList', {
            cards: req.session.deck,
            deck: req.session.deck,
            title: "Votre deck",
            // deck: true 
        })
    },

    addToDeck: async (req, res) => {
        const { id } = req.params

        try {

            if (req.session.deck.length >= 5) {
                throw new Error('Deck déjà complet')
            }

            if (req.session.deck.find((card) => card.id === Number(id))) {
                throw new Error('La carte est déjà dans le deck')
            }

            const card = await dataMapper.getOneCardById(id)
            req.session.deck.push(card)
            res.redirect('/deck')

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },

    removeFromDeck: (req, res) => {
        const { id } = req.params
        req.session.deck = req.session.deck.filter((card) => card.id !== Number(id))
        res.redirect('/deck')
    }
}

module.exports = deckController;