const articles = require('./seeds/002_articles');
const identities = require('./seeds/001_identities');
const auctions = require('./seeds/003_auctions');

const seed = async () => {
  //am adaugat automat valorile din resources pentru fiecare tabel din firebase cu ajutorul functiei seed din 002
  await identities.seed();
  await articles.seed();
  await auctions.seed();
};

(async () => {
  try {
    await seed();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = seed;
