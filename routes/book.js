const { Router } = require('express');
const { Book } = require('../controllers');

const router = Router();

/**
 * Use RESTful routes only
 * @see https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
 */
router.post('/admin/books', Book.create);
// router.get('/admin/books', Book.readMany);
// router.get('/admin/books/:id', Book.readOne);
// router.put('/admin/books/:id', Book.update);
// router.delete('/admin/books/:id', Book.remove);


module.exports = router;
