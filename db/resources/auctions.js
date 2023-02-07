const { initializeFirestore } = require('../../functions');
const chance = require('../../lib/chance');
const statuses = require("../../constants");

module.exports = async () => {
  const db = initializeFirestore();
  const articlesRef = db.collection('articles');
  const data = await articlesRef.get();
  const docs = data.docs.map((doc) => doc.data()); //extragem toate datele din firebase
  return [
    {
      name: chance.string(),
      startDate: chance.date(),
      endDate: chance.date(),
      articles: [
        {
          name: docs[0].name,
          price: docs[0].price,
          date: docs[0].date,
          description: docs[0].description,
          condition: docs[0].condition,
          colors: [...docs[0].colors],
          available: docs[0].available,
        },
      ],
      description: chance.string(),
      status: chance.pickone(statuses),
    },
    {
      name: chance.string(),
      startDate: chance.date(),
      endDate: chance.date(),
      articles: [
        {
          name: docs[1].name,
          price: docs[1].price,
          date: docs[1].date,
          description: docs[1].description,
          condition: docs[1].condition,
          colors: [...docs[1].colors],
          available: docs[1].available,
        },
      ],
      description: chance.string(),
      status: chance.pickone(statuses),
    },
  ];
};
