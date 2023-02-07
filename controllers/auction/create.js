const { pick } = require('lodash');
const { error, initializeFirestore } = require('../../functions');
const statuses = require('../../constants');

module.exports = async (req, res) => {
  const { me } = req.user; //idul userului adminului care face requestul, liniile 4,5,6,7 raman daca e ruta de admin
  if (!me) {
    throw error(404, 'Missing required params');
  }
  const { name, startDate, endDate, description, status, articles } = req.body; //destructurare
  if(!statuses.includes(status)){
    throw error(400, 'Invalid Status');
  }
  const db = initializeFirestore();
  const auctionsRef = db.collection('auctions'); //colectiile din firestore sunt mereu la plural -> conventie
  const snapshot = await auctionsRef //verificam daca in colectia noastra mai exista ceva cu aceleasi valori
    .where('name', '==', name)
    .where('startDate', '==', startDate)
    .where('endDate', '==', endDate)
    .where('description', '==', description)
    .where('status', '==', status)
    .where('identity.id', '==', me)
    .get();
  if (snapshot.size) {
    throw error(409, 'An identical article already exists');
  }
  if (!snapshot.size) {
    const articlesReceived = articles.filter(article => article.available === false);
    if (articlesReceived.length > 0) {
      throw error(400, 'Selected articles are not available');
    }
    const identitiesRef = db.collection('identities');
    const doc = await identitiesRef.doc(me).get();
    if (!doc.exists) {
      throw error(404, 'Resource not found');
    }
    const payload = {
      identity: {
        ...pick(doc.data(), ['email', 'name']), //spread operator
        id: doc.id,
        //aici am stocat despre cine are dreptul sa creeze
      },
      name: name.trim(),
      startDate: startDate,
      endDate: endDate,
      description: description.trim(),
      articles: articles,
      status,
    };
    const response = await auctionsRef.add(payload);
    if (!response.id) {
      throw error(500, 'Failed to create auction');
    }
    const data = (await response.get()).data();
    data.id = response.id;

    return res.status(200).json({  message: 'Auction created' });
  }
};
