import express from '../app/express.js';
import dlRouter from './dl.router.js';
import feedRouter from './feed.router.js';
const router = express.Router();
router.use(dlRouter);
router.use(feedRouter);
export default router;
