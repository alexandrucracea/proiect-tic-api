/* eslint-disable no-console */
const { initializeFirestore } = require('../../functions');
const  articles  = require('../resources/articles');

exports.seed = async () => {
  try {
    console.log('Planting seeds for articles');

    const seeds = await articles();
    const db = initializeFirestore();
    for (const seed of seeds) {
      await db.collection('articles').add(seed);
    }

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot add articles');
    console.error(err);
  }
};
