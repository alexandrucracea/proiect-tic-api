const { initializeFirestore } = require("../../functions");

module.exports = async (req, res) => {
    const {id} = req.params;
    const {me} = req.user;

    if( !id || !me){
        throw error(404,'Missing required params');
    }

    const db = initializeFirestore();
    const auctionsRef = db.collection('auctions').doc(id);
    const doc = await auctionsRef.get();
    if(!doc.exists){
        throw error(404, 'Resource not found');
    }
    //TODO -> DE ADAUGAT ACEL IF ME SA MA ASIGUR CA EU STERG SI DOAR ADMINII POT STERGE
    await auctionsRef.delete();
  return res.status(200).json({message: 'Auction deleted' });

};