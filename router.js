const { Router } = require('express');
const {
  authenticate,
  error,
  errorHandler,
  loading,
  notFound,
} = require('./middleware');
const { identity, article, auction } = require('./routes');


const router = Router();

// protect all non-public routes
router.all('/admin', authenticate);
router.all('/admin/*', authenticate);

// useful middleware for testing
router.use(loading);
router.use(error);

// use the router instances defined
router.use(identity);
router.use(article);
router.use(auction);

// matches any other HTTP method and route not matched before
router.all('*', notFound);

// finally, an error handler
router.use(errorHandler);

module.exports = router;
