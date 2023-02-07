const { initializeFirestore, error } = require("../../functions");

module.exports = async (req, res) => {
  const { id } = req.params;
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

  await articlesRef.delete();

  return res.status(200).json({message: 'Article deleted' });
};