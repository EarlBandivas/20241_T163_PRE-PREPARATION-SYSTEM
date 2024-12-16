import express from 'express';
import calendar from './calendar/route.js';
import internals from './handler.js'
const router = express.Router();


router.get('/', internals.get)

router.get('/redirect', internals.redirect)


router.use('/calendar', calendar)

router.get('/schedule-event', internals.scheduleEvent)

export default router;
