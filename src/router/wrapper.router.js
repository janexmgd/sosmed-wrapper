import express from '../app/express.js';
import wrapperController from '../controller/wrapper.controller.js';
import upload from '../helper/upload.js';
const { tiktokSingle, tiktokMulti, igDL, xDL } = wrapperController;
const wrapperRouter = express.Router();

// single link
wrapperRouter.post('/tiktokdl/single', tiktokSingle);
wrapperRouter.post('/tiktokdl/multi', upload, tiktokMulti);
wrapperRouter.post('/igdl', igDL);
wrapperRouter.post('/xDL', xDL);
export default wrapperRouter;
