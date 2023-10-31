import express from '../app/express.js';
import feedController from '../controller/feed.controller.js';
const { tiktok } = feedController;

const feedRouter = express.Router();

feedRouter.post('/feed/tiktok', tiktok);

export default feedRouter;
