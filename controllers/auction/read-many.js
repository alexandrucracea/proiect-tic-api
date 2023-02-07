const { initializeFirestore } = require("../../functions")

module.exports = async (req, res) => {
    const db = initializeFirestore();
    const auctionsRef = db.collection('auctions');
    const data = await auctionsRef.get();
    const docs = data.docs.map((doc) =>{
        const auction = doc.data();
        auction.id = doc.id;
        return auction
    });
    return res.status(200).json(docs);
}