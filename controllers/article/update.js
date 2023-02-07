const { initializeFirestore } = require('../../functions');

module.exports = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { me } = req.user;
  if (!id || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const articlesRef = db.collection('articles').doc(id);
  const doc = await articlesRef.get(); //luam toate inregistrariile din articles
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }
  // if (doc.data().identity.id !== me) {
  //   throw error(400, 'Not allowed to update article');
  // }

  //TODO -> de adaugat  acea verificare pentru if !me sa punem un mesaj <-> DOAR ADMINII FAC MODIFICARI

  const payload = {};
  const {
    description,
    name,
    available,
    date,
    colors,
    period,
    condition,
    price,
    identity,
    year,
  } = req.body;
  if (description) {
    payload.description = description;
  }
  if (name) {
    payload.name = name;
  }
  // if(available){
  payload.available = available;
  // }
  if (date) {
    payload.date = date;
  }
  if (colors) {
    payload.colors = colors;
  }
  if (period) {
    payload.period = period;
  }
  if (condition) {
    payload.condition = condition;
  }
  if (price) {
    payload.price = price;
  }
  if (identity) {
    payload.identity = identity;
  }
  if (year) {
    payload.year = year;
  }

  await articlesRef.update(payload);
  const data = (await articlesRef.get()).data();

  return res.status(200).json({ data, message: 'Article updated' });
};
