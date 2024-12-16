import express from 'express';
const router = express.Router();
import google from './google/route.js'
import types from './Types/route.js'
import items from './Items/route.js'
import expences from './Expenceses/route.js'



router.use('/google', google)
router.use('/types', types)
router.use('/items', items)
router.use('/expences', expences)



export default router;
