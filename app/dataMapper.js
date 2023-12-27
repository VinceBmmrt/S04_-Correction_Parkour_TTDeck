const database = require('./database');

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },
  async getOneCardById(cardId) {
    const query = {
      text: "SELECT * FROM card WHERE id = $1",
      values: [cardId]
    };
    const result = await database.query(query);
    return result.rows[0];
  },

  async getCardsByElement(element) {
    let query;
    if (element === 'null') {
      query = "SELECT * FROM card WHERE element IS NULL"
    } else {
      query = {
        text: "SELECT * FROM card WHERE element = $1",
        values: [element]
      };
    }

    const result = await database.query(query);
    return result.rows;
  },
  async getCardsByLevel(level) {
    const query = {
      text: "SELECT * FROM card WHERE level = $1",
      values: [level]
    };

    const result = await database.query(query);
    return result.rows;
  },

  async getCardsByDirectionValue(direction, value) {
    const query = {
      text: `SELECT * FROM card WHERE 
      $1 = 'north' AND value_north >= $2 
      OR $1 = 'east' AND value_east >= $2
      OR $1 = 'west' AND value_west >= $2
      OR $1 = 'south' AND value_south >= $2`,
      values: [direction, value]
    };

    const result = await database.query(query);
    return result.rows;
  },

  async getCardsByName(name) {
    const query = {
      text: "SELECT * FROM card WHERE name ILIKE $1",
      values: [`%${name}%`]
    };

    const result = await database.query(query);
    return result.rows;
  },


};


module.exports = dataMapper;
