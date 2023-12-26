import express from '../app/express.js';
import dlRouter from './dl.router.js';
import feedRouter from './feed.router.js';
import tiktokRouter from './tiktok.router.js';
const router = express.Router();
router.use(dlRouter);
router.use(tiktokRouter);
router.use(feedRouter);
export default router;
