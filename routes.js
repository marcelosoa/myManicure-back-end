const { Router } = require('express');

const RegisterController = require('./src/app/controllers/RegisterController');

const router = Router();

router.get('/registers', RegisterController.index);
router.get('/registers/:id', RegisterController.show);
router.post('/registers/', RegisterController.store);
router.put('/registers/:id', RegisterController.update);

module.exports = router;
