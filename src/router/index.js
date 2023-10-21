import express from '../app/express.js';
import wrapperRouter from './wrapper.router.js';
const router = express.Router();
router.use(wrapperRouter);
export default router;
