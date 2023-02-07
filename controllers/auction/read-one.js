const { initializeFirestore } = require("../../functions");

module.exports = async(req,res) => {
    const {id} = req.params; //preluam id-ul din link
    if(!id){
        throw error( 404, 'Missing required params');
    }

    const db = initializeFirestore();
    const auctionsRef = db.collection('auctions').doc(id);
    const doc = await auctionsRef.get();
    if(!doc.exists){
        throw error(404, "Resource not found");
    }
    const data = doc.data();
    
    return res.status(200).json(data);
}