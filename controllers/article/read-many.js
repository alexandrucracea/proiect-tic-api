const { initializeFirestore } = require("../../functions");

module.exports = async (req, res) => {

  const db = initializeFirestore();
  const articlesRef = db.collection('articles');
  const data = await articlesRef.get();
  const docs = data.docs.map((doc) => {
    const article = doc.data();
    article.id = doc.id;
    return article
  });
  return res.status(200).json(docs);
};