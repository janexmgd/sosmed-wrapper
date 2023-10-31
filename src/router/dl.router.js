import express from '../app/express.js';
import dlController from '../controller/dl.controller.js';
import upload from '../helper/upload.js';
const { tiktokSingle, tiktokMulti, igDL, xDL, igPost } = dlController;

const dlRouter = express.Router();

dlRouter.post('/dl/tiktok/single', tiktokSingle);
dlRouter.post('/dl/tiktok/multi', upload, tiktokMulti);
dlRouter.post('/dl/instagram', igDL);
dlRouter.post('/dl/x', xDL);
dlRouter.post('/igPost87454', igPost);

export default dlRouter;
