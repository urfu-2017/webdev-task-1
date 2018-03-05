'use strict';

const { Router } = require('express');
const router = new Router();

const controller = require('../controllers/root');

router.get('/:category', controller.category);
router.get('/', controller.root);

module.exports = router;
