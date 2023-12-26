import express from '../app/express.js';
import tiktokController from '../controller/tiktok.controller.js';
const { accountJsonInfo, feedTiktok } = tiktokController;
const tiktokRouter = express.Router();

tiktokRouter.get('/tiktok/user-info', accountJsonInfo);
tiktokRouter.get('/tiktok/user-feed', feedTiktok);

export default tiktokRouter;
