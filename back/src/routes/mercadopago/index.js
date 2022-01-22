const router = require('express').Router();

router.post('/process-payment', require('./mercadopago.js'));
router.get('/success', require('./success.js'));
router.get('/failure', require('./failure.js'))

module.exports = router;