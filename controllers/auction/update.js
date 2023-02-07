const { initializeFirestore } = require("../../functions");

module.exports = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { me } = req.user;
  if (!id || !me) {
    throw error(404, 'Missing required params');
  }

  const db = initializeFirestore();
  const auctionsRef = db.collection('auctions').doc(id);
  const doc = await auctionsRef.get(); //luam toate inregistrariile din articles
  if (!doc.exists) {
    throw error(404, 'Resource not found');
  }

//TODO -> de adaugat  acea verificare pentru if !me sa punem un mesaj <-> DOAR ADMINII FAC MODIFICARI

  const payload = {};
  const { endDate,startDate,description,status,name,articles} = req.body;
  if(endDate){
    payload.endDate = endDate;
  }
  if (startDate) {
    payload.startDate = startDate;
  }
  if(description){
    payload.description = description;
  }
  if(status){
    payload.status = status;
  }
  if(name){
    payload.name = name;
  }
  if(articles){
    payload.articles = articles;
  }

  await auctionsRef.update(payload);
  const data = (await auctionsRef.get()).data();

  return res.status(200).json({ data, message: 'Auction updated' });
};