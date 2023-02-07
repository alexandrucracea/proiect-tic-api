const chance = require('../../lib/chance');

module.exports = async () => {
  //TODO de adaugat si o parte de identities ca sa pot sa editez cum trebuie aici datele
  //TODO de cautat o librarie care sa genereze cum trebuie numele, pretul pentru ce am eu nevoie specific
  return [
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true
    },
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true

    },
    {
      name: chance.string(),
      price: chance.floating(),
      date: chance.date(),
      period: chance.string(),
      description: chance.string(),
      condition: chance.string(),
      colors: [chance.color(), chance.color(), chance.color()],
      available: true
    },
  ];
};
