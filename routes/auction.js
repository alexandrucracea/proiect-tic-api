const { Router } = require('express');
const { Auction } = require('../controllers');

const router = Router();

router.post('/admin/auctions', Auction.create);
router.get('/auctions', Auction.readMany);
router.get('/auctions/:id', Auction.readOne);
router.put('/admin/auctions/:id',Auction.update);
router.delete('/admin/auctions/:id',Auction.remove);

module.exports = router;