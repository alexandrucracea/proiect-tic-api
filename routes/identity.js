const { Identity } = require('../controllers');
const { Router } = require('express');

const router = Router();

router.get('/admin/profile', Identity.profile);
router.post('/admin/change-password', Identity.changePassword);
router.post('/login', Identity.login);
router.post('/logout', Identity.logout);
router.post('/refresh-token', Identity.refreshToken);

module.exports = router;
