const router = require('express').Router();

router.post('/process-payment', require('./mercadopago.js'));
router.get('/feedback', require('./feedback.js'));

module.exports = router;