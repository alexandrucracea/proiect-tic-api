const { Router } = require('express'); //iei din express npm constructorul pentru Router
const { Article } = require('../controllers');

const router = Router();

router.post('/admin/articles', Article.create);
router.get('/articles', Article.readMany);
router.get('/articles/:id', Article.readOne);
router.put('/admin/articles/:id',Article.update);
router.delete('/admin/articles/:id',Article.remove);

module.exports = router;
//router - obiect
//Router - ctor