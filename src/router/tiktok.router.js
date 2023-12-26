import express from '../app/express.js';
import tiktokController from '../controller/tiktok.controller.js';
const { accountJsonInfo } = tiktokController;
const tiktokRouter = express.Router();

tiktokRouter.get('/tiktok', accountJsonInfo);

export default tiktokRouter;
