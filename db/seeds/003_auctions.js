const { initializeFirestore } = require('../../functions');
const auctions = require('../resources/auctions');

exports.seed = async () => {
    try{
        console.log('Planting seeds for auctions');

        const seeds = await auctions();
        const db = initializeFirestore();
        for(const seed of seeds){
            await db.collection('auctions').add(seed);
        }
        console.log('✓');
    }catch (err){
        console.warn('Error! Cannot add auctions');
        console.error(err);
    }
}